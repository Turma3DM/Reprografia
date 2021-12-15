// Services
// Service dos detalhes do Pedido.
const detPedidoService = require("../services/detPedido.service");
// Service que envia descrição de constraints para o front-end/email
const verifyConstraints = require("../services/verifyConstraints");

// Constants
const status = require("../constants/status.constant");

//Verificando usuário como admin
const { authJwt } = require("../middlewares");

module.exports = {

    //// GET 

    // Buscar os pedidos por ID do pedido
    buscarPorIdPedido: async (req, res) => {
        try {
            let pedidos = await detPedidoService.findByPk(req.params.id);

            if (pedidos !== null) {
                const constraints = await verifyConstraints({
                    centro_custos: pedidos.det_pedidos[0].id_centro_custos,
                    curso: pedidos.det_pedidos[0].id_curso,
                    modo_envio: pedidos.id_modo_envio,
                    avaliacao: pedidos.id_avaliacao_pedido,
                    servicoCA: pedidos.servico_pedidos[0].servicoCA,
                    servicoCT: pedidos.servico_pedidos[0].servicoCT
                });

                pedidos.id_avaliacao_pedido = constraints[1].descricao;
                pedidos.det_pedidos[0].id_centro_custos = constraints[2].descricao;
                pedidos.det_pedidos[0].id_curso = constraints[3].descricao;
                pedidos.servico_pedidos[0].dataValues.servicoCA = constraints[5].descricao;
                pedidos.servico_pedidos[0].dataValues.servicoCT = constraints[6].descricao;
                pedidos.id_modo_envio = await constraints[4].descricao;
            }

            // Retorna mensagem se encontrar um pedido nulo.
            else {
                return res.json({
                    status: status.error,
                    message: `Nenhum pedido com id ${req.params.id}`
                });
            }

            // Só passa para o serializer se o nif fornecido no login for o mesmo ao nif cadastrado no pedido.
            if (req.user.nif === pedidos.nif) {
                return res.status(200).json(pedidos);
            }

            // Verificando se o usuário que está querendo ver os detalhes do pedido de outro usuário é administrador
            else {
                // Enviando a array de pedidos dentro da requisição
                req.array = pedidos;

                // Executando middleware para verificar se o usuário é admin ou não
                // se ele for admin, no propŕio middleware será retornado o array,
                // se não, ele irá responder que é necessário o ROLE ADMIN.
                await authJwt.isAdmin(req, res);
            }
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    }
};
