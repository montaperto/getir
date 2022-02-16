const { MongoClient } = require('mongodb')
const request = require('supertest')
const app = require('./index.js')

describe('Post Endpoints', () => {
  it('Should return report', async () => {
    const res = await request(app)
      .post('/')
      .send({
        startDate: "2016-01-21",
        endDate: "2016-02-02",
        minCount: 2700,
        maxCount: 3000
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.code).toEqual(0)
  })
})


describe('Post Endpoints', () => {
  it('Should return report', async () => {
    const res = await request(app)
      .post('/')
      .send({
        startDate: "2016-01",
        endDate: "2016-02-02",
        minCount: 2700,
        maxCount: 3000
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body.code).toEqual(1)
  })
})

afterAll(done => {
  done()
})
