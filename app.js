const { spawn, spawnSync } = require('child_process')
const cors = require('cors')
const express = require('express')
const { existsSync, readFileSync, statSync } = require('fs')
const { Reader } = require('maxmind')

const file = './data/GeoLite2-Country.mmdb'

if (!existsSync(file)) {
  spawnSync('./getdb')
}
setInterval(() => { spawn('./getdb') }, 24 * 3600 * 1000)
const lookup = new Reader(readFileSync(file), { watchForUpdates: true })

const app = express()
app.enable('trust proxy')
app.use(cors())
app.get('/version', (_, res) => {
  res.jsonp({ file: { birthtime: statSync(file).birthtime.toISOString() } })
})
app.get('/:ip?', (req, res) => {
  const location = lookup.get(req.params.ip || req.ip)
  if (location) {
    res.jsonp({ country: location.country.iso_code })
  } else {
    res.status(422).send({ country: null })
  }
})

module.exports = app
