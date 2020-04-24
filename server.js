import { listen } from "./app"

const port = process.env.PORT || 3000
listen(port, () => {
  console.log(`Listening on port ${port}`)
})
