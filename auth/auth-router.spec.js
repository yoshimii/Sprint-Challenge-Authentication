const db = require('../database/dbConfig.js');
const request = require('supertest');
const server = require('../api/server.js')




describe('POST /register', () => {
    beforeEach(async() => {
        await db('users')
            .truncate();
    })

    it('should register member to db', async () => {        
        const newDad = await request(server).post('/api/auth/register')
            .send({ username: 'galadriel', password: 'pippin' })
            expect(newDad.body.username).toMatch(/galadriel/)
        
    })

    it('should return a status of 201', async () => {
        const response = await request(server).post('/api/auth/register')
        .send({ username: 'galadriel', password: 'pippin' })
        expect(response.status).toBe(201)
    })

})

describe('GET /', () => {
    beforeEach(async() => {
        await db('users')
            .truncate();
    })

    it('should register member to db', async () => {        
        const response = await request(server).get('/api/jokes')
            expect(response.status).toBe(201)
        
    })

    // it('should return a status of 201', async () => {
    //     const response = await request(server).post('/api/auth/register')
    //     .send({ username: 'galadriel', password: 'pippin' })
    //     expect(response.status).toBe(201)
    // })

})

