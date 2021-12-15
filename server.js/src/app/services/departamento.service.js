//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { departamento } = initModels(sequelize);

module.exports = {

    findAllDeps: async (enabled) => {
        const deps = await departamento.findAll({
            where: { ativado: enabled }
        });

        return deps;
    },

    findDepByPk: async (id) => {
        const deps = await departamento.findByPk(id);

        return deps;
    },

    createDep: async ({ params }) => {
        const deps = await departamento.create(params);

        return deps;
    },

    updateDep: async ({ departament, param }) => {
        const updated = await departament.update(param);
        return updated;
    },

    findByName: async (descricao) => {
        const deps = await departamento.findOne({
            where: {
                descricao: descricao
            },
        });

        return deps;
    },

    destroyDep: async () => {
        return "Método não implementado!";
    },
};