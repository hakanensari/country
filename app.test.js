const request = require("supertest")
const app = require("./app")

test("gets the requesting IP", async () => {
  const ip = "80.245.152" // the German National Library
  const res = await request(app).get("/").set("x-forwarded-for", ip)
  expect(res.body.ip).toBe(ip)
  expect(res.body.country).toBe("DE")
})

test("gets any IP", async () => {
  const ip = "9.9.9.9"
  const res = await request(app).get(`/${ip}`).set("x-forwarded-for", "8.8.8.8")
  expect(res.body.ip).toBe(ip)
  expect(res.body.country).toBe("US")
})

test("handles failure", async () => {
  const ip = "192.168.0.1"
  const res = await request(app).get("/").set("x-forwarded-for", ip)
  expect(res.status).toBe(422)
  expect(res.body.ip).toBe(ip)
  expect(res.body.country).toBeNull()
})

test("returns version", async () => {
  const res = await request(app).get("/version")
  expect(res.body.file.birthtime).toBeDefined()
})
