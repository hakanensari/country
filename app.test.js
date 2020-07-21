const request = require("supertest")
const app = require("./app")

test("gets the requesting IP", async () => {
  const res = await request(app).get("/").set("x-forwarded-for", "80.245.152") // the German National Library
  expect(res.body.country).toBe("DE")
})

test("gets any IP", async () => {
  const res = await request(app)
    .get("/8.8.8.8")
    .set("x-forwarded-for", "9.9.9.9")
  expect(res.body.country).toBe("US")
})

test("handles failure", async () => {
  const res = await request(app).get("/").set("x-forwarded-for", "192.168.0.1")
  expect(res.status).toBe(422)
  expect(res.body.country).toBeNull()
})

test("returns version", async () => {
  const res = await request(app).get("/version")
  expect(res.body.file.birthtime).toBeDefined()
})
