import request from 'supertest';

const api = "https://api-recollect.onrender.com"


describe("testes de rota", () =>{
    it("should test that true === true", () =>{
        const result = true;
        expect(result).toBe(true);
    });

     it("obter a rota principal", async () =>{
        const res = await request(api).get('/')
    
        expect(res.statusCode).toEqual(404);
        //expect(res.body).toHaveProperty('message');
    });

    it("obter todos os usuarios cadastrados", async () =>{
        const res = await request(api).get('/users')

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });

    it("obter todas as empresas cadastradas", async () =>{
        const res = await request(api).get('/companies')

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });


})