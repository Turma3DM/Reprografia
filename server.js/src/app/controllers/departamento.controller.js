//Service dos serviços 
const service = require("../services/departamento.service");
const cursoService = require("../services/curso.service");

//Constants
const status = require("../constants/status.constant");

//Verificando usuário como admin
const { authJwt } = require("../middlewares");

module.exports = {

    departamentoGet: async (req, res) => {
        const { enabled } = req.params;

        try {
            const deptos = await service.findAllDeps(enabled);

            if (deptos.length < 1) {
                return res.json({ status: status.error, message: "Sem registros..." });
            }
            else {
                //Se a solicitação for de serviços habilitados (exibidos no formulário 
                // de pedido), então será retornado sem problemas o array para o usuário.
                if (enabled === "1") {
                    return res.status(200).json(deptos);
                }
                // Agora se o usuário estiver solicitando os serviços desabilitados,
                // então será verificado se ele tem permissão para vizualizar isso
                // (ROLE ADMIN).
                else {
                    // Enviando a array de serviços dentro da requisição
                    req.array = deptos;

                    // Executando middleware para verificar se o usuário é admin ou não
                    // se ele for admin, no propŕio middleware será retornado o array,
                    // se não, ele irá responder que é necessário o ROLE ADMIN.
                    await authJwt.isAdmin(req, res);
                }
            }
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },


    enableOrDisableDepto: async (req, res) => {
        const { id, enable } = req.params;

        try {
            const depto = await service.findDepByPk(id);

            if (depto === null) {
                return res.json({ status: status.error, message: "Departamento não encontrado" })
            }

            await service.updateDep({ departament: depto, param: { ativado: enable } });
            await cursoService.updateByDep({ id: id, param: { ativado: enable } });

            return res.status(200).json({ status: status.ok, message: "Departamento atualizado com sucesso!" });

        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },

    departamentoGetByPk: async (req, res) => {
        const { id } = req.params;

        try {
            const depto = await service.findDepByPk(id);
            return res.status(200).json(depto);
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },

    departamentoPost: async (req, res) => {
        const { descricao } = req.body;

        try {
            const alreadyCreated = await service.findByName(descricao);
            if (alreadyCreated === null) {
                await service.createDep({
                    params: {
                        descricao: descricao
                    }
                })
                return res.status(200).json({ status: status.ok, message: "Departamento criado com sucesso!" });
            }
            else {
                await service.updateDep({ departament: alreadyCreated, param: { ativado: 1 } })
                return res.status(200).json({ status: status.ok, message: "Departamento atualizado com sucesso!" });
            }
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },
}