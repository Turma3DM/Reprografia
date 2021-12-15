const request = require("supertest");
const app = require("../../../src/app.js");

var token = "";

//Rota aberta, somente para pegar o token e utilizá-lo nas próximas requisições
describe("Login", () => {
    it("Resgatando token do usuário ADMIN pelo Login", async () => {
        const response = await request(app).post("/login").send({
            emailOrNif: process.env.ADMIN_NIF,
            senha: process.env.ADMIN_PASS
        });

        console.log(response);
        expect(response.body).not.toHaveProperty("status", "error");
        token = response.body.accessToken;
    });
});

//Testando rotas privadas
describe("Criando usuários", () => {
    it("É possível criar um novo usuário (rota para Admin's)?", async () => {
        const response = await request(app).post("/newUser")
        .set("accessToken", token)
        .send({
            nif: 555,
            // senha: hash, SENHA PADRAO/DEFAULT PASSWORD = senai115
            nome: "TesteJest",
            email: "teste@Jest.superTest",
            depto: 1,
            admin: 0, //criando usuário comum para teste
            cfp: 12345,
            imagem: "uploads/user-img/default/usuario.png",
        });

        console.log(response);

        expect(response.body).not.toHaveProperty("status", "error");
    });
});

describe("solicitando todos os usuários ativos", () => {
    it("É possivel um ADMIN solicitar todos os usuários ativos (rota para Admin's)? ", async () => {
        const response = await request(app).get("/users/enabled=0")
        .set("accessToken", token);
        console.log(response);

        expect(response.body).not.toHaveProperty("status", "error");
    });
});