const request = require("supertest");
const app = require("../../../src/app.js");

describe("Auth", () => {
    it("Verificando se API reconhece que usuário não está logado/autenticado", async () => {
        const response = await request(app).get("/auth")
        console.log(response);
        expect(response.body).toHaveProperty("status", "error");
    }); 
});