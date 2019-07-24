const request = require('supertest')
const app = require('./server/routes/index')


test('Create a valid Service', async() => {
    const service = {
        name: "emma",
        email: "emma@viser.in",
        commail:"tech@viser.in",
        msg:"hello"
    };
    try {
        const count = await Service.count();
        await request(app).post('/post/contactus').send(service)
        const newCount = await Service.count()
        expect(newCount).toBe(count + 1);
    } catch (err) {
        // write test for failure here
        return err
        //console.log(`Error ${err}`)
    }
});