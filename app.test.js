const request = require("supertest")
const app = require("./app")

describe("GET /", () => {
  let ip, req

  beforeEach(() => {
    ip = "9.9.9.9"
    req = request(app).get("/").set("x-forwarded-for", `${ip},1.2.3.4`)
  })

  it("returns IP", async () => {
    const res = await req
    expect(res.body.ip).toBe(ip)
  })

  it("returns country", async () => {
    const res = await req
    expect(res.body.country).toBe("US")
  })

  it("sets cache control to no-cache", async () => {
    const res = await req
    expect(res.headers["cache-control"]).toBe("no-cache")
  })

  it("sets strong etag", async () => {
    const res = await req
    expect(res.headers["etag"]).not.toMatch(/^W\//)
  })

  describe("with bad IP", () => {
    beforeEach(() => {
      req.set("x-forwarded-for", "192.168.0.1,1.2.3.4")
    })

    it("returns status", async () => {
      const res = await req
      expect(res.status).toBe(422)
    })

    it("returns message", async () => {
      const res = await req
      expect(res.body).not.toBeNull()
    })
  })

  describe("with Cloudflare", () => {
    let country

    beforeEach(() => {
      country = "DE"
      req.set("cf-ipcountry", country)
    })

    it("returns IP", async () => {
      const res = await req
      expect(res.body.ip).toBe(ip)
    })

    it("returns country", async () => {
      const res = await req
      expect(res.body.country).toBe(country)
    })
  })
})

describe("GET /:ip", () => {
  let ip, req

  beforeEach(() => {
    ip = "9.9.9.9"
    req = request(app).get(`/${ip}`).set("x-forwarded-for", "1.2.3.4")
  })

  it("returns IP", async () => {
    const res = await req
    expect(res.body.ip).toBe(ip)
  })

  it("returns country", async () => {
    const res = await req
    expect(res.body.country).toBe("US")
  })

  it("sets cache control to public", async () => {
    const res = await req
    expect(res.headers["cache-control"]).toContain("public")
  })
})

describe("GET /info", () => {
  let req

  beforeEach(() => {
    req = request(app).get("/info")
  })

  it("returns maxmind", async () => {
    const res = await req
    expect(res.body.maxmind).toBeDefined()
  })

  it("sets cache-control to public", async () => {
    const res = await req
    expect(res.headers["cache-control"]).toContain("public")
  })

  describe("with Cloudflare", () => {
    beforeEach(() => {
      req.set("cf-ipcountry", "DE")
    })

    it("returns cloudflare", async () => {
      const res = await req
      expect(res.body.cloudflare).toBeTruthy()
    })
  })
})
