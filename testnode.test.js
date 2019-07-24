const request = require('supertest')
const app = require('./server/routes/index')

beforeAll(async () => {
    console.log("Jest Testing Starting")
})

afterAll(async () =>{
    //app.close()
    console.log("Testing Done!!")
})


describe('Test the root path of node', () =>{
   
     test('It should response the get method', () => {
          jest.setTimeout(10000);
        request(app).get('/').then((response) => {
              expect(response.statusCode).toBe(200);
     
         })
     })

    // test("get home route get",async () => {
    //     jest.setTimeout(10000);
    //     const response = await request(app).get('/get/contactus')
    //     expect(response.status).toEqual(200);
    // })

})