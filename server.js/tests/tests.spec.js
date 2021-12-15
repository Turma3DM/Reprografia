// Setamos Ordem de execução para evitar erros como: 
// * Logar antes de registrar um usuário
// pois realizamos os testes em uma ordem de execução específica

require("dotenv").config({ path: ".env.test" });
console.log("Banco de dados utilizado: " + process.env.DB_DATABASE);

// ADMIN -> Aqui realizamos login na conta ADMIN da aplicação
// depois criamos um usuário comum e testamos outras rotas privadas.
require("./tests-flow/integration/admin.spec");

// USER -> Aqui realizamos login na conta criada no teste ADMIN
// depois, executamos algumas rotas permitidas para usuário comum.
require("./tests-flow/integration/user.spec");

// Aqui verificamos se a aplicação verifica o ROLE da conta comum
// e retorna acesso negado para uma requisição com rota privada.
require("./tests-flow/unit/accessDenied.spec");

// Aqui verificamos se a aplicação retorna se a aplicação enviada
// não contém o token necessário para verificarmos a autenticação.
require("./tests-flow/unit/noAuth.spec");