//Biblioteca do sequelize 
const Sequelize = require("sequelize");
//Operadores do sequelize
const Op = Sequelize.Op;

//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { resettoken } = initModels(sequelize);

module.exports = {

    updateByEmail: async (email) => {
        const updated = await resettoken.update({
            used: 1
        },
            {
                where: {
                    email: email
                }
            });

        return updated;
    },

    addToken: async ({ param }) => {
        const created = await resettoken.create(param);

        return created;
    },

    findOneByEmailandToken: async (email, token) => {
        const tokenFinded = await resettoken.findOne({
            where: {
                email: email,
                token: token,
                expiration: { [Op.gt]: Sequelize.fn('CURDATE') },
                used: 0
            }
        });

        return tokenFinded;
    },
};
