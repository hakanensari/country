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
app.get("/version", (req, res) => {
  stat(file, (err, stats) => {
    res.json({ file: { birthtime: stats.birthtime.toISOString() } })
  })
})
app.get("/:ip?", (req, res) => {
  const ip = req.params.ip || req.ip
  const location = lookup.get(ip)
  if (location && location.country) {
    res.json({ country: location.country.iso_code, ip: ip })
  } else {
    res.status(422).json({ country: null, ip: ip })
  }
})

module.exports = app
