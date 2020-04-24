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
    res.jsonp({ file: { birthtime: stats.birthtime.toISOString() } })
  })
})
app.get("/:ip?", (req, res) => {
  const location = lookup.get(req.params.ip || req.ip)
  if (location && location.country) {
    res.jsonp({ country: location.country.iso_code })
  } else {
    res.status(422).send({ country: null })
  }
})

module.exports = app
