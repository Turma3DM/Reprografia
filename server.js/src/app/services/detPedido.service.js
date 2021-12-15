//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { pedido, det_pedido } = initModels(sequelize)

module.exports = {    //Todos os pedidos feito por tal pessoa (nif)
    findByPk: async (id) => {
        const pedidos = await pedido.findByPk(id, {
            include: ['det_pedidos', 'servico_pedidos']
        });

        return pedidos;
    },

    updateRequest: async ({ request, param }) => {
        const pedidoUpdated = await det_pedido.update(param, {
            where: {
                id_pedido: request
            }
        });

        return pedidoUpdated;
    },
};