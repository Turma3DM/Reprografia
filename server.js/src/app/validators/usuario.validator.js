const adminArray = (params) => {
    if (params == 1) {
        return ["admin"];
    }
    else {
        return ["user"];
    }
};

const validatorUsuario = {
    adminArray: adminArray
};

module.exports = validatorUsuario;