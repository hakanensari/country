const { spawn, spawnSync } = require("child_process"),
  cors = require("cors"),
  express = require("express"),
  morgan = require("morgan"),
  fs = require("fs"),
  maxmind = require("maxmind")

const file = "./data/ipinfo_country.mmdb"

if (!fs.existsSync(file)) {
  if (process.env.ACCESS_TOKEN === undefined) {
    throw new Error("Get your free IPinfo.io access token to download the IP to Country database")
  }
  spawnSync("./getdb")
}

if (process.env.ACCESS_TOKEN) {
  setInterval(() => {
    spawn("./getdb")
  }, 24 * 3600 * 1000)
}

const lookup = new maxmind.Reader(fs.readFileSync(file), {
  watchForUpdates: true,
})
const findCountry = (ip) => {
  const location = lookup.get(ip)
  if (location && location.country) {
    return location.country
  }
}

const app = express()

app.use(
  morgan("combined", { skip: (req, res) => process.env.NODE_ENV === "test" }),
)
app.enable("trust proxy")

app.use(cors())

app.use((req, res, next) => {
  if (req.path == "/") {
    res.set("Cache-Control", "no-cache")
  } else {
    res.set("Cache-Control", "public, max-age=3600")
  }
  next()
})

app.set("etag", "strong")

app.use(express.static("public"))

app.get("/info", (req, res) => {
  fs.stat(file, (err, stats) => {
    const updated = stats.birthtime.toISOString().substring(0, 10)
    res.json({
      cloudflare: req.headers["cf-ipcountry"] !== undefined,
      maxmind: updated,
    })
  })
})

app.get("/:ip?", (req, res) => {
  let country
  const ip = req.params.ip || req.ip

  if (req.params.ip) {
    if (!maxmind.validate(ip)) {
      return res
        .status(422)
        .json({ error: { code: 422, message: "Unprocessable Entity" } })
    }
  } else {
    if (req.headers["cf-ipcountry"] && req.headers["cf-ipcountry"] != "XX") {
      country = req.headers["cf-ipcountry"]
    }
  }

  if (!country) {
    country = findCountry(ip)
  }

  if (country) {
    res.json({ ip: ip, country: country })
  } else {
    res.status(404).json({ error: { code: 404, message: "Not Found" } })
  }
})

app.get("*", function (req, res) {
  return res
    .status(422)
    .json({ error: { code: 422, message: "Unprocessable Entity" } })
})

module.exports = app
