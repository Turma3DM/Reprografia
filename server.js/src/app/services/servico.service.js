//Biblioteca do sequelize 
const Sequelize = require("sequelize");
//Operadores do sequelize
const Op = Sequelize.Op;

//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { servicoCapaAcabamento, servicoCopiaTamanho } = initModels(sequelize);

//Validators
const validators = require("../validators/servico.validator");

module.exports = {

    findAllServicos: async (enabled) => {
        const servicoCA = await servicoCapaAcabamento.findAll({
            where: {
                ativado: enabled
            }
        });
        const servicoCT = await servicoCopiaTamanho.findAll({
            where: {
                ativado: enabled
            }
        });

        const servicos = { "servicosCA": servicoCA, "servicosCT": servicoCT }

        return servicos;
    },

    findServicoByPk: async ({ type, id }) => {

        const servico = await validators.isParameterValid(type);

        if (servico === false) {
            return false;
        }

        const serv = await servico.findByPk(id);

        return serv;
    },

    createServico: async ({ type, params }) => {

        const servico = await validators.isParameterValid(type);

        if (servico === false) {
            return false;
        }

        const serv = await servico.create(params);

        return serv;
    },

    serviceDecrement: async ({ type, number, param }) => {

        const servico = await validators.isParameterValid(type);

        if (servico === false) {
            return false;
        }

        const serv = await servico.decrement({ quantidade: + param }, {
            where: {
                id_servico: {
                    [Op.or]: [number]
                }
            }
        });

        return serv;
    },

    updateServico: async ({ servico, param }) => {
        const updated = await servico.update(param);
        return updated;
    },

    destroyServico: async () => {
        return "Método não implementado!";
    },
};