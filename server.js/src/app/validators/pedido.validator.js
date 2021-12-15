const detPedidoService = require("../services/detPedido.service");
const status = require("../constants/status.constant");

const isParameterValid = (params) => {
    if (params == 1) {
        return [1, 2];
    }
    else if (params == 0) {
        return [0, 0];
    }
};

const paramsForVerify = async (req, res, next) => {
    try {
        let jaSolicitado = await detPedidoService.findByPk(req.params.id);

        if(jaSolicitado === null){
            res.json({
                status: status.error,
                message:
                    "Esse pedido não foi realizado ainda!"
            })
        }

        else if (req.user.nif !== jaSolicitado.nif) {
            res.json({
                status: status.error,
                message:
                    "Esse pedido não foi realizado anteriormente pelo seu usuário!"
            })
        }
        else {
            req.body.num_copias = jaSolicitado.det_pedidos[0].num_copias/jaSolicitado.realizado_qtdade;
            req.body.num_paginas = jaSolicitado.det_pedidos[0].num_paginas/jaSolicitado.realizado_qtdade;
            req.body.servicoCA = jaSolicitado.servico_pedidos[0].servicoCA;
            req.body.servicoCT = jaSolicitado.servico_pedidos[0].servicoCT;
            next();
    }
    } catch (error) {
        console.log(error)
    }
}

const validatorPedido = {
    isParameterValid: isParameterValid,
    paramsForVerify: paramsForVerify
};

module.exports = validatorPedido;
