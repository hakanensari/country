const { existsSync } = require('fs');
const { spawn, spawnSync } = require('child_process');
const cors = require('cors');
const express = require('express');
const maxmind = require('maxmind');

// Seed database file.
if (!existsSync('./GeoLite2-Country.mmdb')) {
  spawnSync('./getdb');
}

// Refresh database file once a day.
setInterval(
  () => { spawn('./getdb'); },
  24 * 3600 * 1000,
);

// Initialise database.
const countryLookup = maxmind.openSync(
  './GeoLite2-Country.mmdb',
  { watchForUpdates: true },
);

// Set up app.
const app = express();

app.use(cors());
app.enable('trust proxy');

app.get('/', (req, res) => {
  const loc = countryLookup.get(req.ip);
  if (loc) {
    res.jsonp({ country: loc.country.iso_code });
  } else {
    res.status(404).jsonp({ country: null });
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
