const router = require('express').Router();
const Record = require('../models/Record')
const multer = require('multer');

// setting file storage destination and filename
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/upload')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
});
let fileName = [];
const upload = multer({ storage: fileStorageEngine });

// Add Record
router.post('/add', async (req, res) => { 
    try{
        const newRecord = new Record({
            username: req.body.username,
            email: req.body.email || '',
            phone: req.body.phone,
            imageData: fileName !== [] 
            ? fileName
            : ''
        })
        const record = await newRecord.save();
        fileName = [];
        res.status(200).json(record)
    } catch(err){
        console.log(err)
    }

});

// Get all Record
router.get('/allRecord', async (req, res) => {
    const data = await Record.find();
    res.status(200).send(data);
})

// Update Record
router.put('/:username', async (req, res) => {
    try{
        const record = await Record.findOneAndUpdate({"username" : req.params.username}, {
            $set: req.body,
        });
        res.status(200).json('Record has been updated');
    }catch(err){
        return res.status(500).json(err);
    }
});

// Delete Record
router.delete('/:username', async (req, res) => {
    try {
        const record = await Record.findOneAndDelete({"username" : req.params.username});
        res.status(200).json('Record has been deleted');
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Upload image
router.post('/uploadImage', upload.array('images', 5), (req, res) => {
    if(req.files) {
        for(let i = 0; i < req.files.length; i++)
        fileName.push(req.files[i].filename);
    }
    res.status(200).send('File send Successfull');
})

// image display
router.get('/:path', (req, res) => {
    res.sendFile(__dirname + `/upload/${req.params.path}`);
})

module.exports = router;