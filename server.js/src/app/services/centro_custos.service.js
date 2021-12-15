//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { centro_custos } = initModels(sequelize);

module.exports = {

    findAllCentroCustos: async (enabled) => {
        const centroCustos = await centro_custos.findAll({
            where: { ativado: enabled }
        });

        return centroCustos;
    },

    findCentroCustosByPk: async (id) => {
        const centroCustos = await centro_custos.findByPk(id);
        return centroCustos;
    },

    createCentroCustos: async ({ params }) => {
        const centroCustos = await centro_custos.create(params);
        return centroCustos;
    },

    updateCentroCustos: async ({ custos, param }) => {
        const updated = await custos.update(param);
        return updated;
    },

    findByName: async (descricao) => {
        const centroCustos = await centro_custos.findOne({
            where: {
                descricao: descricao
            },
        });

        return centroCustos;
    },

    destroyCentroCustos: async () => {
        return "Método não implementado!";
    },
};