import supertest from 'supertest';
import app from '../src';
import { FruitInput } from 'services/fruits-service';

describe('fruits suit', () => {
    it(`should create a fruit`,
        async () => {
            const fruit: FruitInput = {
                name: 'apple',
                price: 2
            };
            const result =
                await supertest(app).
                    post('/fruits').
                    send(fruit);
            const { status } = result;
            expect(status).toEqual(201);
        })

    it(`given a duplicated fruit should 
    return 409`, async () => {
        const fruit: FruitInput = {
            name: 'apple',
            price: 2
        };

        const result =
            await supertest(app).
                post('/fruits').
                send(fruit);
        const { status } = result;
        expect(status).toEqual(409);
    })

    it(`should return a corresponding 
    id fruit`, async () => {
        const id = '1';

        const result =
            await supertest(app).
                get(`/fruits/${id}`)
        expect(result.status).toBe(200);
        expect(JSON.stringify(result.body)).toBe(JSON.stringify({
            name: 'apple',
            price: 2,
            id: 1,
        }));
    })
    it(`Should return a list of fruits`,
        async () => {

            const result =
                await supertest(app).
                    get('/fruits');
            expect(result.status).toBe(200);
            expect(result.body.length).toBeGreaterThanOrEqual(1);
        })
})
