const { existsSync } = require('fs');
const { spawn, spawnSync } = require('child_process');
const cors = require('cors');
const express = require('express');
const maxmind = require('maxmind');

// Seed database
if (!existsSync('./GeoLite2-City.mmdb')) {
  spawnSync('./getdb');
}

// Refresh database once a day
setInterval(
  () => { spawn('./getdb'); },
  24 * 3600 * 1000,
);

// Initialise database
const countryLookup = maxmind.openSync(
  './GeoLite2-City.mmdb',
  { watchForUpdates: true },
);

// Set up app
const app = express();

app.enable('trust proxy');
app.use(cors());

app.get('/:ip?', (req, res) => {
  const loc = countryLookup.get(req.params.ip || req.ip);
  if (loc) {
    res.jsonp(loc);
  } else {
    res.status(404).jsonp({ error: 'Not found' });
  }
});

app.listen(3000, _ => {
  console.log('Listening on port 3000');
});
