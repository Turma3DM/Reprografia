const multer = require('multer');

//UPLOAD DE IMAGENS
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //Se o arquivo for .jpeg/.png/.jpg/.gif ele envia o anexo para pasta /uploads/user-img
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
            cb(null, './src/uploads/user-img');
        }
        //Se o arquivo for pdf/.xlsx /.docx ele envia o anexo para pasta /uploads/anexos
        else if (file.mimetype === 'application/pdf' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb(null, './src/uploads/anexos');
        }
        else {
            console.log(file.mimetype);
            return cb(new Error("Mime type not supported!"));
        }
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + file.originalname.toLowerCase().split(' ').join("-");
        cb(null, fileName);
    }
});

const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 2048 * 2048 * 5
    // },
    // fileFilter: fileFilter
});

module.exports = upload;