import jest from 'jest';
import request from 'supertest';
import app from '../routes'

const api = "https://api-recollect.onrender.com/"


describe("testes de rota", () =>{
    it("should test that true === true", () =>{
        const result = true;
        expect(result).toBe(true);
    });

     it("obter a rota principal", async () =>{
        const res = await request(api).get('/')
        
        console.log(res.status);
        console.log(res.body);
        //expect(res.statusCode).toEqual(200);
        //expect(res.body).toHaveProperty('message');
    });
})