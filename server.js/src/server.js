// Utilizando express
const app = require('./app');

// Imports para as informações que vamos trazer no console (consumo de ram, uso de cpu...)
const os = require("os");
const utils = require("os-utils");
const diskspace = require("diskspace");

// Criar/Verificar Database
const createDatabase = require("./database/createDb");

// Models
const db = require("./database");

// Função para inserir os registros fixos de 
// algumas tabelas (como tipo_usuario, tipo_copia, etc...)
const inserirRegistros = require("./database/insertDb");

// Porta que a aplicação irá rodar
const port = process.env.PORT || 3002;

// Criando/Verificando database/schema antes de sincronizar e inserir registros
createDatabase().then(() => {
    // Sincronizando nosso banco de dados comforce as models já criadas!
    db.sequelize.sync({ force: false }).then(() => {
        app.listen(port, async () => {
            await inserirRegistros.InserirRegistros();
            await inserirRegistros.InserirUsuario();
            console.log(`\n(||| | | ---- Server running on port ${port} ---- | | |||)`);

            // Informações sobre a CPU, ARQUITETURA, 
            // TOTAL DE MEMÓRIA RAM DISPONÍVEL NO SISTEMA E SEU USO.
            console.log("\nCPUS: ", os.cpus());
            console.log("\nArquitetura do processador: " + process.arch);
            console.log("Plataforma que a API está rodando: " + process.platform);
            console.log("\nTotal de memória ram: " + os.totalmem() + " B");
            console.log("Uso Atual de memória ram: " + Math.round(
                os.totalmem - os.freemem()) + " B");
            console.log("Memória ram livre: " + Math.round(os.freemem()) + " B");

            // Listando disco tanto do windows quanto do linux
            let disc = "C*";
            if (process.platform === "linux") {
                disc = "/";
            }

            // Verificando disco (espaço total... livre e status)
            diskspace.check(disc, function (err, result) {
                console.log("\nTamanho total do disco: " + result.total + " B");
                console.log("Espaço do disco utilizado: " + result.used + " B");
                console.log("Espaço livre do disco: " + result.free + " B");
                console.log("Status do disco: " + result.status + "\n");
            });

            // Verificando uso de CPU e uso de Memória
            function infosConsole() {
                utils.cpuUsage(function (v) {
                    console.log("\n--------------------------------------------");
                    console.log("\nInformações que serão atualizadas em 60 segundos:\n");
                    console.log("CPU Usage (%): " + v * 100 + "%");
                    console.log("Uso de memória ram: " + Math.round(
                        os.totalmem - os.freemem()) + "B");
                    console.log("Memória Livre: " + os.freemem() + " B \n");
                    console.log("--------------------------------------------");
                });
            };

            function run() {
                setInterval(infosConsole, 60000);
            };

            run();
        });
    })
})
