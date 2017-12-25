const { existsSync } = require('fs');
const { spawn, spawnSync } = require('child_process');
const cors = require('cors');
const express = require('express');
const maxmind = require('maxmind');

// Seed database file.
if (!existsSync('./GeoLiteCity.dat')) {
  spawnSync('./getdb');
}

// Refresh database file once a day.
setInterval(
  () => { spawn('./getdb'); },
  24 * 3600 * 1000,
);

// Initialise database.
maxmind.init('./GeoLiteCity.dat', {
  indexCache: true,
  checkForUpdates: true,
});

// Set up app.
const app = express();

app.use(cors());
app.enable('trust proxy');

app.get('/', (req, res) => {
  const loc = maxmind.getLocation(req.ip);
  if (loc) {
    res.json({ country: loc.countryCode });
  } else {
    res.status(404).json({ country: null });
  }
});

app.listen(3000, () => { console.log('Listening on port 3000'); });
