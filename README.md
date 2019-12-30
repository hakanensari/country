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

Use our [hosted service](https://api.country.is) or run privately with

```
docker run -d -p 3000:3000 hakanensari/country -e LICENSE_KEY=YOUR_LICENSE_KEY
```

Replace the `YOUR_LICENSE_KEY` placeholder with a license key associated with your MaxMind account.

## Notes

Country uses [GeoLite2 data](http://dev.maxmind.com/geoip/geoip2/geolite2/) provided by MaxMind. Since 30 December 2019, you need to [register for a license key](https://www.maxmind.com/en/geolite2/signup) to download their data.

The hosted service does not log requests.
