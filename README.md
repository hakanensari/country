# Country

[![Build](https://github.com/hakanensari/country/workflows/build/badge.svg)](https://github.com/hakanensari/country/actions)

[**Country**](https://country.is) is a browser-friendly and privacy-conscious geolocation API that gets your users' country (and nothing else) from their IP.

## Usage

Country has a minimal :fire: interface.

Query the IP of the requesting client.

```
https://api.country.is/
```

Query any IP.

```
https://api.country.is/9.9.9.9
```

See the age of the underlying data file.

```
https://api.country.is/version
```

Country automatically checks for a newer version every 24 hours.

## Deployment

Use the [hosted service](https://api.country.is) or run privately with

```
docker run -d -p 3000:3000 -e LICENSE_KEY=YOUR_LICENSE_KEY hakanensari/country
```

Replace the `YOUR_LICENSE_KEY` placeholder with a license key associated with your MaxMind account.

## Notes

Country uses [GeoLite2 data](http://dev.maxmind.com/geoip/geoip2/geolite2/) provided by MaxMind. Since 30 December 2019, you need to [register for a license key](https://www.maxmind.com/en/geolite2/signup) to download their data.

The hosted service does not log requests.
