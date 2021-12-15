//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { servicoCapaAcabamento, servicoCopiaTamanho } = initModels(sequelize)

const isParameterValid = (params) => {
    if (params === "ct") {
        return servicoCopiaTamanho;
    }
    else if (params === "ca") {
        return servicoCapaAcabamento;
    }
    else {
        return false;
    }
};

const servicoValidator = {
    isParameterValid: isParameterValid
};

module.exports = servicoValidator;