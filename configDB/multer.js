const multer = require('multer');
//storing local destination and filename while storing
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname + "---" + Date.now());
    }
})

module.exports = storage