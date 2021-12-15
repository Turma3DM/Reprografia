//Service dos serviços
const service = require("../services/centro_custos.service");

//Constants
const status = require("../constants/status.constant");

//Verificando usuário como admin
const { authJwt } = require("../middlewares");

module.exports = {

    centroCustosGet: async (req, res) => {
        const { enabled } = req.params;

        try {
            const centroCustos = await service.findAllCentroCustos(enabled);

            if (centroCustos.length < 1) {
                return res.json({ status: status.error, message: "Sem registros..." });
            }

            //Se a solicitação for de serviços habilitados (exibidos no formulário 
            // de pedido), então será retornado sem problemas o array para o usuário.
            if (enabled === "1") {
                return res.status(200).json(centroCustos);
            }
            // Agora se o usuário estiver solicitando os serviços desabilitados,
            // então será verificado se ele tem permissão para vizualizar isso
            // (ROLE ADMIN).
            else {
                // Enviando a array de serviços dentro da requisição
                req.array = centroCustos;

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


    enableOrDisableCentroCustos: async (req, res) => {
        const { id, enable } = req.params;

        try {
            const centroCustos = await service.findCentroCustosByPk(id);
            if(centroCustos === null){
                return res.json({ status: status.error, message: "Centro de custo não encontrado" })
            }

            await service.updateCentroCustos({ custos: centroCustos, param: { ativado: enable } });

            return res.status(200).json({ status: status.ok, message: "Centro de custos atualizado com sucesso!" });

        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },

    centroCustosGetByPk: async (req, res) => {
        const { id } = req.params;

        try {
            const centroCustos = await service.findCentroCustosByPk(id);
            return res.status(200).json(centroCustos);
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },

    centroCustosPost: async (req, res) => {
        const { descricao } = req.body;

        try {
            const alreadyCreated = await service.findByName(descricao)
            if (alreadyCreated === null) {
                await service.createCentroCustos({
                    params: {
                        descricao: descricao
                    }
                })
                return res.status(200).json({ status: status.ok, message: "Centro de custos criado com sucesso!" });
            }
            else {
                await service.updateCentroCustos({ custos: alreadyCreated, param: { ativado: 1 } })
                return res.status(200).json({ status: status.ok, message: "Centro de custos atualizado com sucesso!" });
            }
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },
}