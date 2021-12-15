const config = require("../config/");
//Biblioteca do sequelize 
const Sequelize = require("sequelize");
//Operadores do sequelize
const Op = Sequelize.Op;

const { initModels } = require("../app/models/init-models");
const { sequelize } = require("./index.js");
var models = initModels(sequelize);

const bcrypt = require("bcrypt");

exports.InserirRegistros = async () => {
    try {
        await models.avaliacao_pedido.bulkCreate([
            {
                id_avaliacao_pedido: 0,
                descricao: "Ainda não avaliado."
            },
            {
                id_avaliacao_pedido: 1,
                descricao: "Atendeu!"
            },
            {
                id_avaliacao_pedido: 2,
                descricao: "Não atendeu!"
            }
        ]);
        models.centro_custos.bulkCreate([
            {
                id_centro_custos: 1,
                descricao: "Aprendizagem Industrial Presencial"
            },
            {
                id_centro_custos: 2,
                descricao: "Técnico de Nível Médio Presencial"
            },
            {
                id_centro_custos: 3,
                descricao: "Graduação Tecnológica Presencial"
            },
            {
                id_centro_custos: 4,
                descricao: "Pós-Graduação Presencial"
            },
            {
                id_centro_custos: 5,
                descricao: "Extensão Presencial"
            },
            {
                id_centro_custos: 6,
                descricao: "Iniciação Profissional Presencial"
            },
            {
                id_centro_custos: 7,
                descricao: "Qualificação Profissional Presencial"
            },
            {
                id_centro_custos: 8,
                descricao: "Aperfeiç./Especializ. Profis. Presencial"
            }
        ]);
        await models.departamento.bulkCreate([
            {
                id_depto: 1,
                descricao: "Sem departamento",
            },
            {
                id_depto: 2,
                descricao: "Aprendizagem Industrial Presencial",
            },
            {
                id_depto: 3,
                descricao: "Técnico de Nível Médio Presencial",
            },
            {
                id_depto: 4,
                descricao: "Graduação Tecnológica Presencial",
            },
            {
                id_depto: 5,
                descricao: "Pós-Graduação Presencial",
            },
            {
                id_depto: 6,
                descricao: "Extensão Presencial",
            },
            {
                id_depto: 7,
                descricao: "Iniciação Profissional Presencial",
            },
            {
                id_depto: 8,
                descricao: "Qualificação Profissional Presencial",
            },
            {
                id_depto: 9,
                descricao: "Aperfeiç./Especializ. Profis. Presencial",
            },
        ]);

        models.curso.bulkCreate([
            {
                id_curso: 1,
                descricao: "CT-DS", //Curso Técnico de Desenvolvimento de Sistemas
                id_depto: 3
            },
            {
                id_curso: 2,
                descricao: "CT-MP", //Curso Técnico de Mecânica de Precisão
                id_depto: 3
            },
            {
                id_curso: 3,
                descricao: "CST-MP", //Curso Superior Técnico de Mecânica de Precisão
                id_depto: 4
            },
            {
                id_curso: 4,
                descricao: "Pós-Graduação", //Pós Graduação
                id_depto: 5
            }
        ]);

        models.modo_envio.bulkCreate([
            {
                id_modo_envio: 1,
                descricao: "Digital",
            },
            {
                id_modo_envio: 2,
                descricao: "Físico",
            },
        ]);
        models.tipo_usuario.bulkCreate([
            {
                id: 1,
                descricao: "user",
            },
            {
                id: 2,
                descricao: "admin",
            },
        ]);
        models.servicoCopiaTamanho.bulkCreate([
            {
                id_servico: 1,
                descricao: "Preto&Branco - Tamanho A5",
                quantidade: 15000,
                valor_unitario: 0.06
            },
            {
                id_servico: 2,
                descricao: "Preto&Branco - Tamanho A4",
                quantidade: 4000000,
                valor_unitario: 0.024
            },
            {
                id_servico: 3,
                descricao: "Preto&Branco - Tamanho A3",
                quantidade: 4000,
                valor_unitario: 0.15
            },
            {
                id_servico: 4,
                descricao: "Colorida - Tamanho A4",
                quantidade: 4000,
                valor_unitario: 0.1,
                ativado: 0
            },
            {
                id_servico: 5,
                descricao: "Preto&Branco - Reduzida",
                quantidade: 100,
                valor_unitario: 0.3
            },
            {
                id_servico: 6,
                descricao: "Preto&Branco - Ampliada",
                quantidade: 100,
                valor_unitario: 0.3
            },
        ]);
        await models.servicoCapaAcabamento.bulkCreate([
            {
                id_servico: 1,
                descricao: "Capa em papel 150g e 2 grampos laterais",
                quantidade: 4000,
                valor_unitario: 0.07
            },
            {
                id_servico: 2,
                descricao: "Capa em papel 150g e 2 grampos a cavalo",
                quantidade: 1000,
                valor_unitario: 0.05
            },
            {
                id_servico: 3,
                descricao: "Capa em papel 150g e espirais de plástico",
                quantidade: 100,
                valor_unitario: 0.5
            },
            {
                id_servico: 4,
                descricao: "Capa em PVC e espirais de plástico",
                quantidade: 30000,
                valor_unitario: 0.45
            },
            {
                id_servico: 5,
                descricao: "Sem capa",
                quantidade: 9999999,
                valor_unitario: 0
            },
        ]);
        console.log("\n(||| | | ----- Registros Inseridos com sucesso!!! ----- | | |||)");
    } catch {
        console.log({ error: "Registros já inseridos! (Validation error)" });
    };
};

exports.InserirUsuario = async () => {
    try {
        const password = await bcrypt.hash(
            config.authConfig.adminAccount.pass, config.authConfig.jwt.saltRounds
            );
        const user = await models.usuario.create({
            nif: 1,
            senha: password,
            nome: "ADMIN ACCOUNT",
            email: config.authConfig.adminAccount.email,
            depto: 1,
            cfp: 0,
            imagem: config.authConfig.adminAccount.defaultImage
            // ativado: 1, -> Valor já definido com defaultValue
            // primeiro_acesso: 1 -> Valor já definido com defaultValue
        });
        if (user) {
            const roles = await models.tipo_usuario.findAll({
                where: {
                    descricao: {
                        [Op.or]: ["admin"]
                    }
                }
            });
            if (roles) {
                const setRoles = await user.setRoles(roles);
                if (setRoles) {
                    console.log(`(| | | --- Usuário ADMIN criado com sucesso! --- | | |)`);
                };
            };
        };
    } catch {
        console.log({ error: "Usuário ADMIN já inserido! (Validation error)" });
    };
};
