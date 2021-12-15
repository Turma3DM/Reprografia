//Service dos serviços
const service = require("../services/servico.service");

//Constants
const constants = require("../constants/service.constant");
const status = require("../constants/status.constant");

//Variáveis para respostas
var typeMsg = "";
var okMessage = "";

//Verificando usuário como admin
const { authJwt } = require("../middlewares");

module.exports = {

    servicosGet: async (req, res) => {
        const { enabled } = req.params;

        try {
            const servicos = await service.findAllServicos(enabled);

            if (servicos.servicosCT.length < 1 && servicos.servicosCA.length < 1) {
                return res.json({ status: status.error, message: "Sem registros..." });
            }

            //Se a solicitação for de serviços habilitados (exibidos no formulário 
            // de pedido), então será retornado sem problemas o array para o usuário.
            if (enabled === "1") {
                return res.status(200).json(servicos);
            }
            // Agora se o usuário estiver solicitando os serviços desabilitados,
            // então será verificado se ele tem permissão para vizualizar isso
            // (ROLE ADMIN).
            else {
                // Enviando a array de serviços dentro da requisição
                req.array = servicos;

                // Executando middleware para verificar se o usuário é admin ou não
                // se ele for admin, no propŕio middleware será retornado o array,
                // se não, ele irá responder que é necessário o ROLE ADMIN.
                await authJwt.isAdmin(req, res);
            }
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },

    servicosGetByPk: async (req, res) => {
        const { id, type } = req.params;

        try {
            const servicos = await service.findServicoByPk({ type: type, id: id });

            if (servicos === false) {
                return res.json({ status: status.error, message: constants.invalidParameter });
            }
            else if (servicos === null) {
                return res.json({ status: status.error, message: constants.notFound });
            }
            else {
                return res.status(200).json(servicos);
            }
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },

    servicosPost: async (req, res) => {
        const { descricao, quantidade, valor_unitario } = req.body;
        const { type } = req.params;

        try {
            if (quantidade !== "" || quantidade !== null) {
                const create = await service.createServico({ type: type, params: { descricao: descricao, quantidade: quantidade, valor_unitario: valor_unitario } });

                if (create === false) {
                    return res.json({ status: status.error, message: constants.invalidParameter });
                }

                okMessage = constants.successCreated;

                if (type === "ca") {
                    typeMsg = constants.caMessage;
                }
                else if (type === "ct") {
                    typeMsg = constants.ctMessage;
                }

                const message = typeMsg + create.id_servico + okMessage;
                return res.status(200).json({ status: status.ok, message: message });
            }
            else {
                return res.json({ status: status.error, message: "Insira a quantidade do seu serviço!" });
            }
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },

    servicosPut: async (req, res) => {
        const { id, type } = req.params;
        const { quantidade, valor_unitario } = req.body;

        try {
            //aqui temos que passar o type e o id, para ele buscar pela service.
            const servicos = await service.findServicoByPk({ type, id });

            if (servicos === false) {
                return res.json({ status: status.error, message: constants.invalidParameter });
            }

            else if (servicos === null) {
                return res.json({ status: status.error, message: constants.notFound });
            }

            else {
                //no update aqui temos que passar a array que recebemos do find...
                await service.updateServico({ servico: servicos, param: { quantidade, valor_unitario } });
                okMessage = constants.successAtt;

                if (type === "ca") {
                    typeMsg = constants.caMessage;
                }
                else if (type === "ct") {
                    typeMsg = constants.ctMessage;
                }

                const message = typeMsg + id + okMessage;
                return res.status(200).json({ status: status.ok, message: message });
            }
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },

    enableOrDisableServico: async (req, res) => {
        const { type, id, enable } = req.params;

        try {
            const servicos = await service.findServicoByPk({ type, id });

            if (servicos === false) {
                return res.json({ status: status.error, message: constants.invalidParameter });
            }
            else if (servicos === null) {
                return res.json({ status: status.error, message: constants.notFound });
            }

            await service.updateServico({ servico: servicos, param: { ativado: enable } });

            okMessage = constants.successAtt;

            if (type === "ca") {
                typeMsg = constants.caMessage;
            }
            else if (type === "ct") {
                typeMsg = constants.ctMessage;
            }

            const message = typeMsg + id + okMessage;
            return res.status(200).json({ status: status.ok, message: message });
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    }
};
