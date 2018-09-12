# Country.is

Country.is is an IP to geolocation API that helps you look up the location of an IP address. It uses [GeoLite2 data](http://dev.maxmind.com/geoip/geoip2/geolite2/) provided by MaxMind.

## Usage

The interface is minimal.

The root route queries the IP of your browsing app.

```
https://api.country.is/
```

Or specify an IP explicitly.

```
https://api.country.is/8.8.8.8
```

## Deployment

Run a private instance with

```
docker run -d -p 3000:3000 hakanensari/country
```
