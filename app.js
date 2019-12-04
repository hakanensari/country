const { existsSync } = require('fs')
const { spawn, spawnSync } = require('child_process')
const cors = require('cors')
const express = require('express')
const maxmind = require('maxmind')

// Seed database
if (!existsSync('./data/GeoLite2-Country.mmdb')) {
  spawnSync('./getdb')
}

// Refresh database once a day
setInterval(
  () => { spawn('./getdb') },
  24 * 3600 * 1000
)

// Initialise database
const lookup = maxmind.openSync(
  './data/GeoLite2-Country.mmdb',
  { watchForUpdates: true }
)

// Set up app
const app = express()

app.set('port', process.env.PORT || '3000')
app.enable('trust proxy')
app.use(cors())

app.get('/:ip?', (req, res) => {
  const loc = lookup.get(req.params.ip || req.ip)
  if (loc) {
    res.jsonp({ country: loc.country.iso_code })
  } else {
    res.status(422).send({ country: null })
  }
})

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`)
})
