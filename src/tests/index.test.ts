import request from 'supertest';

const api = "https://api-recollect.onrender.com"


describe("testes de rota", () => {

    it("obter todas as empresas cadastradas", async () => {
        try {
            const res = await request(api).get('/companies/')

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message');
        } catch (err) {
            console.error(err);
        }
    });

    it("cadastrar uma empresa no banco de dados", async () => {
        try {

            const res = await request(api)
                .post('/companies/')
                .send({
                    "id": "1",
                    "companyName": "Teste Postman",
                    "site": "https://www.reciclageminteligente.com.br",
                    "responsibleName": "Antônio Almeida",
                    "responsiblePhone": 11966582578,
                    "companyEmail": "testepostman@testepostman.com.br",
                    "address": {
                        "street": "Rua Quirino Cardoso, 110",
                        "zip": "02879-010",
                        "city": "Sâo Paulo",
                        "state": "São Paulo"
                    },
                    "phone": 1138591852,
                    "typesOfMaterialYouRecycle": "plástico, papel e alumínio",
                    "removeTheMaterialAtAnotherAddress": "Sim",
                    "loginEmail": "reciclagemteste@reciclagemteste.com.br",
                    "password": "12345678"
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('message');

        } catch (err) {
            console.error(err);
        }
    });

    it("Alterar dados da empresa pelo id", async () => {
        try {

            const res = await request(api)
                .put('/companies/1')
                .send({
                    "id": "1",
                    "companyName": "Teste Postman alterado",
                    "site": "https://www.testedealteração.com.br",
                    "responsibleName": "Antônio Almeida alterado",
                    "responsiblePhone": 11966582578,
                    "companyEmail": "testepostman@testepostman.com.br",
                    "address": {
                        "street": "Rua Quirino Cardoso, 110",
                        "zip": "02879-010",
                        "city": "Sâo Paulo",
                        "state": "São Paulo"
                    },
                    "phone": 1138591852,
                    "typesOfMaterialYouRecycle": "plástico, papel e alumínio",
                    "removeTheMaterialAtAnotherAddress": "Sim",
                    "loginEmail": "reciclagemteste@reciclagemteste.com.br",
                    "password": "1234567890"
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('message');

        } catch (err) {
            console.error(err);
        }
    });

    it("Apagar todos os dados da empresa pelo id", async () => {
        try {
            const res = await request(api)
                .delete('/companies/1')

            expect(res.statusCode).toEqual(204);
            expect(res.body).toHaveProperty('message');
        } catch (err) {
            console.error(err);
        }
    });

})