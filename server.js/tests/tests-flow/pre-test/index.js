// Criar/Verificar Database
const createDatabase = require("../../../src/database/createDb");

// Models
const db = require("../../../src/database");
// Função para inserir os registros fixos de alguams tabelas (como tipo_usuario, tipo_copia, etc...)
const inserirRegistros = require("../../../src/database/insertDb");

createDatabase().then(() => {
    // Sincronizando nosso banco de dados com as models já criadas!
    // Force como "true" para ele recriar o banco de testes do 0.
    db.sequelize.sync({ force: true }).then(async () => {
        await inserirRegistros.InserirRegistros();
        await inserirRegistros.InserirUsuario();
        console.log("Banco de dados, tabelas e registros criados para teste!");
        process.exit(0);
    });
});