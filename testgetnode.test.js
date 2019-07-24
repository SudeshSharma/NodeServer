const request = require('supertest')

const app=require('./server/routes/index')

const apiprefix = "/get/contactus"


describe("Contactus Api",() => {
    it("Should return 200 ok", () => {
        jest.setTimeout(10000);
        return request(app).get(apiprefix).expect(200)

    })
})