const { spawn, spawnSync } = require('child_process')
const cors = require('cors')
const express = require('express')
const { existsSync } = require('fs')
const maxmind = require('maxmind')

const datafile = './data/GeoLite2-Country.mmdb'

if (!existsSync(datafile)) {
  spawnSync('./getdb')
}
setInterval(() => { spawn('./getdb') }, 24 * 3600 * 1000)

const app = express()
app.set('port', process.env.PORT || '3000')
app.enable('trust proxy')
app.use(cors())

app.get('/:ip?', (req, res) => {
  maxmind.open(datafile).then((lookup) => {
    const location = lookup.get(req.params.ip || req.ip)
    if (location) {
      res.jsonp({ country: location.country.iso_code })
    } else {
      res.status(422).send({ country: null })
    }
  })
})

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`)
})
