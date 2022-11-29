# Country.is

[![Build](https://github.com/hakanensari/country/workflows/build/badge.svg)](https://github.com/hakanensari/country/actions)

[**Country.is**](https://country.is) is a geolocation API that gets your users' country (and nothing else) from their IP.

## Usage

Country.is has a minimal :fire: interface.

Have your browser or app query its own IP address.

```
https://api.country.is/
```

Query any IP.

```
https://api.country.is/9.9.9.9
```

Introspect the underlying data sources.

```
https://api.country.is/info
```

Country.is automatically checks for a newer version every 24 hours.

## Deployment

Use the [hosted service](https://api.country.is) or run privately with

```
docker run -d -p 3000:3000 -e LICENSE_KEY=YOUR_LICENSE_KEY hakanensari/country
```

Replace the `YOUR_LICENSE_KEY` placeholder with a license key associated with your MaxMind account.

## Notes

Country.is uses geolocation data provided by [Cloudfare](https://support.cloudflare.com/hc/en-us/articles/200168236-Configuring-IP-geolocation) and [MaxMind](http://dev.maxmind.com/geoip/geoip2/geolite2/).

Since 30 December 2019, you need to [register for a license key](https://www.maxmind.com/en/geolite2/signup) to download the MaxMind data.
