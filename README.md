# Country

**Country** is an IP to geolocation API that helps you look up the country where an IP address is based. It uses [GeoLite2 data](http://dev.maxmind.com/geoip/geoip2/geolite2/) provided by MaxMind.

## Usage

The interface is minimal.

The root route queries the IP making the request.

```
https://api.country.is/
```

Or you can specify an IP explicitly.

```
https://api.country.is/9.9.9.9
```

## Deployment

Use the [hosted service](https://api.country.is) or run privately with

```
docker run -d -p 3000:3000 hakanensari/country
```
