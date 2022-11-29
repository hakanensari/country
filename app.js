const { spawn, spawnSync } = require("child_process")
const cors = require("cors")
const express = require("express")
const { existsSync, readFileSync, stat } = require("fs")
const { Reader } = require("maxmind")

const file = "./data/GeoLite2-Country.mmdb"

if (!existsSync(file)) {
  if (process.env.LICENSE_KEY === undefined) {
    throw new Error("Set a license key to download GeoIP data from MaxMind")
  }
  spawnSync("./getdb")
}

if (process.env.LICENSE_KEY) {
  setInterval(() => {
    spawn("./getdb")
  }, 24 * 3600 * 1000)
}

const lookup = new Reader(readFileSync(file), { watchForUpdates: true })
const app = express()

app.enable("trust proxy")
app.use(cors())
app.use((req, res, next) => {
  if (req.path == "/") {
    res.set("Cache-Control", "no-cache")
  } else {
    res.set("Cache-Control", "public, max-age=3600")
  }
  next()
})
app.set("etag", "strong")

app.get("/info", (req, res) => {
  stat(file, (err, stats) => {
    const updated = stats.birthtime.toISOString().substring(0, 10)
    res.json({
      cloudflare: req.headers["cf-ipcountry"] !== undefined,
      maxmind: updated,
    })
  })
})

app.get("/:ip?", (req, res) => {
  const ip = req.params.ip || req.ip
  let countryCode
  if (req.headers["cf-ipcountry"]) {
    if (req.headers["cf-ipcountry"] != "XX") {
      countryCode = req.headers["cf-ipcountry"]
    }
  } else {
    const location = lookup.get(ip)
    if (location && location.country) {
      countryCode = location.country.iso_code
    }
  }
  if (countryCode) {
    res.json({ ip: ip, country: countryCode })
  } else {
    res
      .status(422)
      .json({ error: { code: 422, message: "Unprocessable Entity" } })
  }
})

module.exports = app
