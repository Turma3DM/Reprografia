//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
const { sequelize } = require("../../database");
var models = initModels(sequelize);

const verifyConstraints = async ({ 
    centro_custos, curso, modo_envio, avaliacao, servicoCA, servicoCT, departamento 
}) => {

    //Usuário

    if (departamento) {
        var dataDepartamento = await models.departamento.findOne({
            where: { id_depto: departamento }
        });
    };

    //Pedido&Det_Pedido

    if (centro_custos) {
        var dataCentroCustos = await models.centro_custos.findOne({
            where: { id_centro_custos: centro_custos }
        });
    };

    if (curso) {
        var dataCurso = await models.curso.findOne({
            where: { id_curso: curso }
        });
    };

    if (modo_envio) {
        var dataModoEnvio = await models.modo_envio.findOne({
            where: { id_modo_envio: modo_envio }
        });
    };

    if (avaliacao || avaliacao === 0) {
        var dataAvaliacaoPedido = await models.avaliacao_pedido.findOne({
            where: { id_avaliacao_pedido: avaliacao }
        });
    };

    if (servicoCA) {
        var dataServicoCA = await models.servicoCapaAcabamento.findOne({
            where: {
                id_servico: servicoCA
            },
            attributes: ["id_servico", "descricao"]
        });
    };

    if (servicoCT) {
        var dataServicoCT = await models.servicoCopiaTamanho.findOne({
            where: {
                id_servico: servicoCT
            },
            attributes: ["id_servico", "descricao"]
        });
    };

    return data = [
        dataDepartamento !== undefined ? dataDepartamento.dataValues : null,
        dataAvaliacaoPedido !== undefined ? dataAvaliacaoPedido.dataValues : null,
        dataCentroCustos !== undefined ? dataCentroCustos.dataValues : null,
        dataCurso !== undefined ? dataCurso.dataValues : null,
        dataModoEnvio !== undefined ? dataModoEnvio.dataValues : null,
        dataServicoCA !== undefined ? dataServicoCA.dataValues : null,
        dataServicoCT !== undefined ? dataServicoCT.dataValues : null,
    ];
};

module.exports = verifyConstraints;