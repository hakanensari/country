# Country

[![Build](https://github.com/hakanensari/country/workflows/build/badge.svg)](https://github.com/hakanensari/country/actions)

[**Country**](https://country.is) is a privacy-conscious geolocation API that gets your users' country (and nothing else) from their IP.

## Usage

The interface is minimal.

The root route queries the IP making the request.

```
https://api.country.is/
```

Or query an IP explicitly.

```
https://api.country.is/9.9.9.9
```

## Deployment

Use the [hosted service](https://api.country.is) or run privately with

```
docker run -d -p 3000:3000 hakanensari/country
```

## Notes

Country uses [GeoLite2 data](http://dev.maxmind.com/geoip/geoip2/geolite2/) provided by MaxMind. The hosted service does not log requests.
