const mongoose = require("mongoose");
const dbConfig = require("../config/database.config")
const supertest = require("supertest");
const createServer = require("../src/server");

beforeEach((done) => {
    mongoose.connect(dbConfig.url,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => done()
    )
});

afterEach((done) => {
    mongoose.connection.close(() => done())
});
const app = createServer();
require('../src/routes/routes.js')(app);
test("POST /", async () => {
    const data = {
        "startDate": "2017-01-26",
        "endDate": "2021-02-02",
        "minCount": 100,
        "maxCount": 3500
    }
    await supertest(app)
        .post("/")
        .send(data)
        .expect(200).then((result) => {
            expect(Array.isArray(result.body)).toBeTruthy();
        })
});
