process.env.NODE_ENV = 'test';
const request = require('supertest');

const app = require('../app');
const items = require('../fakeDb');

let strawberries = {
    name: 'Strawberries',
    price: '10'
}

beforeEach(function() {
    items.push(strawberries)
})

afterEach(function() {
    items.length = 0;
})

describe('GET /items', () => {
    test('Get all items', async() => {
        const response = await request(app).get('/items');
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ items: [strawberries] })
    })
})

describe('POST /items', () => {
    test('Creating an item', async() => {
        const response = await request(app).post('/items').send({ name: 'Water', price: '2' });
        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual({ item: { name: 'Water', price: '2' } })
    })
    test('404 if name or price is missing', async() => {
        const response1 = await request(app).post('/items').send({ price: '2' });
        expect(response1.statusCode).toBe(400)
        const response2 = await request(app).post('/items').send({ name: 'Water' });
        expect(response2.statusCode).toBe(400)
        const response3 = await request(app).post('/items').send({});
        expect(response3.statusCode).toBe(400)
    })
})

describe('GET /items/:name', () => {
    test('Get item by name', async() => {
        const response = await request(app).get(`/items/${strawberries.name}`);
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ item: strawberries })
    })
    test('404 if name is invalid', async() => {
        const response = await request(app).get(`/items/Eggs`);
        expect(response.statusCode).toBe(404)
    })
})

describe('PATCH /items/:name', () => {
    test('Up', async() => {
        const response = await request(app).patch(`/items/${strawberries.name}`).send({ name: 'ChickenWings', price: '12' });
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ item: { name: 'ChickenWings', price: '12' } })
    })
    test('404 if name is invalid', async() => {
        const response = await request(app).patch(`/items/Eggs`).send({ name: 'ChickenWings', price: '12' });
        expect(response.statusCode).toBe(404)
    })
})

describe('DELETE /items/:name', () => {
    test('Up', async() => {
        const response = await request(app).delete(`/items/${strawberries.name}`);
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ message: 'Deleted' })
    })
    test('404 if name is invalid', async() => {
        const response = await request(app).delete(`/items/Eggs`);
        expect(response.statusCode).toBe(404)
    })
})
