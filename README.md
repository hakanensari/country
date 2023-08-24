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

Use the [hosted service](https://api.country.is) or run privately via the `Dockerfile`.

```
docker build -t country_is .
docker run -d -p 3000:3000 -e ACCESS_TOKEN=YOUR_ACCESS_TOKEN country_is
```

Replace the `YOUR_ACCESS_TOKEN` placeholder with an access token key associated with your [IPinfo.io account](https://ipinfo.io/account/token).

## Notes

Country.is uses geolocation data provided by [Cloudfare](https://support.cloudflare.com/hc/en-us/articles/200168236-Configuring-IP-geolocation) and [IPinfo.io](https://ipinfo.io/products/free-ip-database)
