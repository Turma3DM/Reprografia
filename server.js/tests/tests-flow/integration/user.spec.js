const request = require("supertest");
const app = require("../../../src/app.js");

var token = "";

//Rota aberta, somente para pegar o token e utilizá-lo nas próximas requisições
describe("Login", () => {
    it("Resgatando token do usuário COMUM pelo Login", async () => {
        const response = await request(app).post("/login").send({
            emailOrNif: "555",
            senha: process.env.DEFAULT_PASSWORD
        });

        console.log(response);
        expect(response.body).not.toHaveProperty("status", "error");
        token = response.body.accessToken;
    });
});

//Rota aberta, somente para pegar o token e utilizá-lo nas próximas requisições
describe("Primeiro acesso - alterando senha", () => {
    it("Verificando se é possível alterar a senha na requisição de primeiro acesso", async () => {
        const response = await request(app).put("/myUser/firstAccess")
        .set("accessToken", token)
        .send({
            senha: "123",
            confirmSenha: "123"
        });
        console.log(response);
        expect(response.body).not.toHaveProperty("status", "error");
    });
});