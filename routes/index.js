var maxmind = require('maxmind');
maxmind.init('./data/GeoLiteCity.dat', { indexCache: true, checkForUpdates: true });

exports.index = function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');

  var loc;

  []
    .concat(getIp(req))
    .some(function(ip) {
      loc = maxmind.getLocation(ip);
      return loc !== null;
    });

  if(loc) {
    res.jsonp({ country: loc.countryCode });
  } else {
    res.status(404).jsonp({ error: 'Not found' });
  }
};

var getIp = function(req) {
  if (req.query.ip) {
    return req.query.ip;
  }

  var forwardedIps = req.header('X-Forwarded-For');
  if (forwardedIps) {
    return forwardedIps.split(',');
  }

  return req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
};
