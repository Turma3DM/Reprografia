const request = require("supertest");
const app = require("../../../src/app.js");
var token = "";

//Rota aberta, somente para pegar o token e utilizá-lo nas próximas requisições
describe("Login", () => {
    it("Resgatando token do usuário COMUM pelo Login após primeiro login (senha alterada)", async () => {
        const response = await request(app).post("/login").send({
            emailOrNif: "555",
            senha: "123"
        });

        console.log(response);
        expect(response.body).not.toHaveProperty("status", "error");
        token = response.body.accessToken;
    });
});

describe("Teste em rota privada", () => {
    it("Usuário comum pode acessar uma rota privada?", async () => {
        const response = await request(app).get("/users/enabled=0")
        .set("accessToken", token)
        console.log(response);
        expect(response.body).toHaveProperty("status", "error");
    }); 
});