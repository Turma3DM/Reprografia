//Service dos serviços
const service = require("../services/curso.service");

//Constants
const status = require("../constants/status.constant");

//Verificando usuário como admin
const { authJwt } = require("../middlewares");

module.exports = {

    cursoGet: async (req, res) => {
        const { enabled } = req.params;

        try {
            const cursos = await service.findAllCourses(enabled);

            if (cursos.length < 1) {
                return res.json({ status: status.error, message: "Sem registros..." });
            }

            //Se a solicitação for de serviços habilitados (exibidos no formulário 
            // de pedido), então será retornado sem problemas o array para o usuário.
            if (enabled === "1") {
                return res.status(200).json(cursos);
            }
            // Agora se o usuário estiver solicitando os serviços desabilitados,
            // então será verificado se ele tem permissão para vizualizar isso
            // (ROLE ADMIN).
            else {
                // Enviando a array de serviços dentro da requisição
                req.array = cursos;

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


    enableOrDisableCurso: async (req, res) => {
        const { id, enable } = req.params;

        try {
            const curso = await service.findCourseByPk(id);

            if(curso === null){
                return res.json({ status: status.error, message: "Curso não encontrado" })
            }

            await service.updateCourse({ course: curso, param: { ativado: enable } });

            return res.status(200).json({ status: status.ok, message: "Curso atualizado com sucesso!" });

        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },

    cursoGetByPk: async (req, res) => {
        const { id } = req.params;

        try {
            const curso = await service.findCourseByPk(id);
            return res.status(200).json(curso);
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },

    cursoPost: async (req, res) => {
        const { descricao, id_depto } = req.body;

        try {
            const alreadyCreated = await service.findByName(descricao)
            if (alreadyCreated === null) {
                await service.createCourse({
                    params: {
                        descricao: descricao,
                        id_depto: id_depto
                    }
                })
                return res.status(200).json({ status: status.ok, message: "Curso criado com sucesso!" });
            }
            else {
                await service.updateCourse({ course: alreadyCreated, param: { ativado: 1, id_depto: id_depto } });
                return res.status(200).json({ status: status.ok, message: "Curso atualizado com sucesso!" });
            }
        }
        catch (err) {
            res.status(500).json({ status: status.error, message: err.message });
        };
    },
}