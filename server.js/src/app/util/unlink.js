//Arquivo de config
const config = require("../../config/").authConfig;

const { unlink } = require("fs");

const unlinkImg = async (params) => {
    if (params !== config.adminAccount.defaultImage) {
        try {
            await unlink(params, (err) => {
                if (err) throw err;
                console.log(`Deletado com sucesso: ${params}`);
            });
            return;
        } catch (err) {
            console.log(err);
            return;
        }
    } 
    else {
        return;
    }
}

module.exports = unlinkImg;