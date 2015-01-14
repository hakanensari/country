var maxmind = require('maxmind');
maxmind.init('./data/GeoLiteCity.dat', { indexCache: true, checkForUpdates: true });

exports.index = function(req, res) {
  var loc = maxmind.getLocation(getIp(req));
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

  var forwardedIps = req.header('x-forwarded-for');
  if (forwardedIps) {
    return forwardedIps.split(',')[0];
  }

  return req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
};
