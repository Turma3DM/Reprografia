//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { feedback } = initModels(sequelize)

module.exports = {
    createFeedback: async ({ param }) => {
        const feedbackCreated = await feedback.create(param);

        return feedbackCreated;
    },

    getFeedback: async (id) => {
        const feedbacks = await feedback.findAll({
            where: { pedidoId: id }
        });

        return feedbacks;
    },

    getFeedbackNif: async (id, nif) => {
        const feedbacks = await feedback.findAll({
            where: { pedidoId: id, userId: nif }
        });

        return feedbacks;
    },

    findByPk: async (id) => {
        const feedbacks = await feedback.findByPk(id)

        return feedbacks;
    }
}
