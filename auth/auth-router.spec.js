const db = require('../database/dbConfig.js');
const request = require('supertest');
const server = require('../api/server.js')

describe('GET /jokes', () => {
    beforeEach(async() => {
        await db('users')
            .truncate();
    })

    it('should return status 201 on login', async () => {    
        //user registers
        const response = await request(server).post('/api/auth/register')
        .send({ username: 'galadriel', password: 'pippin' })
    
        //user logs in
        const loginResponse = await request(server).post('/api/auth/login')
            .send({ username: 'galadriel', password: 'pippin' })
            expect(loginResponse.status).toBe(200)
        console.log(loginResponse.body)

    })

    it('should return a token', async () => {    
        //user registers
        const response = await request(server).post('/api/auth/register')
        .send({ username: 'galadriel', password: 'pippin' })
    
        //user logs in
        const loginResponse = await request(server).post('/api/auth/login')
            .send({ username: 'galadriel', password: 'pippin' })
            expect(loginResponse.body.message).toMatch('Welcome galadriel!')
        console.log(loginResponse.body)

    })


})

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

describe('GET /jokes', () => {
    beforeEach(async() => {
        await db('users')
            .truncate();
    })

    it('should allow authenticated users to view jokes in JSON format', async () => {    
        //user registers
        const response = await request(server).post('/api/auth/register')
        .send({ username: 'galadriel', password: 'pippin' })
        
        // expect(response.body.password === 'pippin').toBeFalsy()//password is hashed

        //user logs in
        const loginResponse = await request(server).post('/api/auth/login')
            .send({ username: 'galadriel', password: 'pippin' })
            .expect('Content-Type', /json/)

        //server responds with jokes in json format
        const dadJokes = await request(server).get('/api/jokes')
            .auth('galadriel', 'pippin')
            .set('Authorization', loginResponse.body.token)
            .expect('Content-Type', /json/)

    })

    it('jokes should be bad jokes', async () => {    
        //user registers
        const response = await request(server).post('/api/auth/register')
        .send({ username: 'galadriel', password: 'pippin' })
        
        // expect(response.body.password === 'pippin').toBeFalsy()//password is hashed

        //user logs in
        const loginResponse = await request(server).post('/api/auth/login')
            .send({ username: 'galadriel', password: 'pippin' })
            .expect('Content-Type', /json/)

        //server responds with dad jokes
        const dadJokes = await request(server).get('/api/jokes')
            .auth('galadriel', 'pippin')
            .set('Authorization', loginResponse.body.token)
            .expect('Content-Type', /json/)

        expect(dadJokes.body[0]).toEqual({
            id: '0189hNRf2g',
            joke: "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later."
          })

    })

})

