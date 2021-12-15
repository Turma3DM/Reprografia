//Biblioteca do sequelize 
const Sequelize = require("sequelize");
//Operadores do sequelize
const Op = Sequelize.Op;

//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { usuario, tipo_usuario } = initModels(sequelize);

//Validators
const unlink = require("../util/unlink.js");

//Funções do usuário 
module.exports = {

    //Registrar usuário
    addUser: async ({ param }) => {
        const user = await usuario.create(param);

        return user;
    },

    findAllUsers: async (ativado) => {
        const usuarios = await usuario.findAll({
            where: {
                ativado: ativado
            },
            include: [
                'roles'
            ],

        });

        return usuarios;
    },

    findUserbyPk: async (nif, { attributes }) => {
        const user = await usuario.findByPk(nif, {
            include: [
                'roles'
            ],
            attributes: attributes,
        });

        return user;
    },

    findOneByEmail: async (email) => {
        const user = await usuario.findOne({
            where: {
                email: email
            }
        });

        return user;
    },

    findAllByName: async (user) => {
        const usuarios = await usuario.findAll({
            where: {
                nome: {
                    [Op.like]: `${user}%`
                },
            },
            include: [
                'roles'
            ],
            attributes: { exclude: ["senha"] },
        });

        return usuarios;
    },

    updateUser: async ({ user, param, file }) => {

        if (file) {
            await unlink(user.imagem);
        }

        const updated = await user.update(param);

        return updated;
    },

    getRoles: async (user) => {
        const roles = await user.getRoles();

        return roles;
    },

    getDescRoles: async (admin) => {
        const roles = await tipo_usuario.findAll({
            where: {
                descricao: {
                    [Op.or]: admin
                }
            }
        });

        return roles;
    },

    setRoles: (user, roles) => {
        const userRoles = user.setRoles(roles);

        return userRoles;
    },

    destroyUser: async (user) => {
        return "Método não implementado!";
    },
};