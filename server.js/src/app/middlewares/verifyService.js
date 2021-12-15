//Service dos Serviços
const service = require("../services/servico.service");

const verificaQtdade = (req, res, prop) => {

    const { num_copias, num_paginas } = req.body;

    const folhasImpressas = num_paginas * num_copias;

    if (prop.quantidade <= 0) {
        req.err = true;
        return res.json({ status: "error", message: `Serviço ${prop.descricao} está esgotado!` });
    }
    else if (prop.quantidade < folhasImpressas) {
        req.err = true;
        return res.json({ status: "error", message: `Serviço ${prop.descricao} não contém quantidade suficiente para essa solicitação` });
    }
};

const verifyService = async (req, res, next) => {

    const { servicoCA, servicoCT } = req.body;
    req.err = false;

    //Regra de Negócio
    const CA = await service.findServicoByPk({ type: "ca", id: servicoCA });
    const CT = await service.findServicoByPk({ type: "ct", id: servicoCT });

    if (CA === null || CT === null) {
        return res.json({ status: "error", message: "Selecione os serviços!" });
    };

    await verificaQtdade(req, res, CA);

    if (req.err === true) {
        return;
    };

    await verificaQtdade(req, res, CT);

    req.sub_total = parseFloat(CA.valor_unitario + CT.valor_unitario);

    if (req.err === false) {
        next();
        return;
    };
};

module.exports = verifyService;