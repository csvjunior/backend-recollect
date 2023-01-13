import jest from 'jest';
import request from 'supertest';


describe("Sample Test", () =>{
    it("should test that true === true", () =>{
        const result = true;
        expect(result).toBe(true);
    })
})