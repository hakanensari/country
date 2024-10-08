const cluster = require("cluster")
const os = require("os")
const { initializeDatabase, scheduleDatabaseUpdates } = require("./dbInit")

if (cluster.isMaster) {
  // Initialize and schedule database updates
  initializeDatabase()
  scheduleDatabaseUpdates()

  // Fork workers
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork()
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`)
  })
} else {
  const app = require("./app")

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`Worker ${cluster.worker.id} listening on port ${port}`)
  })
}
