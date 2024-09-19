const { spawn, spawnSync } = require("child_process")
const { existsSync } = require("fs")

const file = "./data/GeoLite2-Country.mmdb"

function initializeDatabase() {
  if (!existsSync(file)) {
    if (process.env.LICENSE_KEY === undefined) {
      throw new Error(
        "Set license credentials to download GeoIP data from MaxMind",
      )
    }
    console.log("Creating database")
    spawnSync("./getdb")
  }
}

function scheduleDatabaseUpdates() {
  if (process.env.LICENSE_KEY && process.env.RUN_INTERVAL !== "false") {
    setInterval(
      () => {
        console.log("Updating database")
        spawn("./getdb")
      },
      24 * 3600 * 1000,
    )
  }
}

module.exports = {
  initializeDatabase,
  scheduleDatabaseUpdates,
  file,
}
