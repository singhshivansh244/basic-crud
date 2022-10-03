const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/images')
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, Date.now()+ ext)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'img/png' ||
        file.mimetype === 'img/jpg' ||
        file.mimetype === 'img/jpeg'
    ){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer ({storage: storage, fileFilter: fileFilter})

module.exports = upload;