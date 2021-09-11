const request = require("supertest")
const app = require("./app")

describe("GET /", () => {
  const ip = "9.9.9.9"

  test("returns IP of the request", async () => {
    const res = await request(app).get("/").set("x-forwarded-for", ip)
    expect(res.body.ip).toBe(ip)
  })

  test("returns country of the request", async () => {
    const res = await request(app).get("/").set("x-forwarded-for", ip)
    expect(res.body.country).toBe("US")
  })

  test("sets cache-control to no-cache", async () => {
    const res = await request(app).get("/").set("x-forwarded-for", ip)
    expect(res.headers["cache-control"]).toBe("no-cache")
  })
})

describe("GET /:ip", () => {
  const ip = "9.9.9.9"

  test("returns given IP", async () => {
    const res = await request(app)
      .get(`/${ip}`)
      .set("x-forwarded-for", "8.8.8.8")
    expect(res.body.ip).toBe(ip)
  })

  test("returns country of given IP", async () => {
    const res = await request(app)
      .get(`/${ip}`)
      .set("x-forwarded-for", "8.8.8.8")
    expect(res.body.country).toBe("US")
  })

  test("sets cache-control to public", async () => {
    const res = await request(app)
      .get(`/${ip}`)
      .set("x-forwarded-for", "8.8.8.8")
    expect(res.headers["cache-control"]).toContain("public")
  })

  test("handles bad IPs", async () => {
    const ip = "192.168.0.1"
    const res = await request(app).get("/").set("x-forwarded-for", ip)
    expect(res.status).toBe(422)
    expect(res.body).not.toBeNull()
  })
})

describe("GET /version", () => {
  test("returns when data was updated", async () => {
    const res = await request(app).get("/version")
    expect(res.body.updatedOn).toBeDefined()
  })

  test("sets cache-control to public", async () => {
    const res = await request(app).get("/version")
    expect(res.headers["cache-control"]).toContain("public")
  })
})
