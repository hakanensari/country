const { spawn, spawnSync } = require('child_process')
const cors = require('cors')
const express = require('express')
const { existsSync, readFileSync } = require('fs')
const { Reader } = require('maxmind')

const datafile = './data/GeoLite2-Country.mmdb'

if (!existsSync(datafile)) {
  spawnSync('./getdb')
}
setInterval(() => { spawn('./getdb') }, 24 * 3600 * 1000)
const lookup = new Reader(readFileSync(datafile), { watchForUpdates: true })

const app = express()
app.enable('trust proxy')
app.use(cors())
app.get('/:ip?', (req, res) => {
  const location = lookup.get(req.params.ip || req.ip)
  if (location) {
    res.jsonp({ country: location.country.iso_code })
  } else {
    res.status(422).send({ country: null })
  }
})

module.exports = app
