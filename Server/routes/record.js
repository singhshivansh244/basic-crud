const router = require('express').Router();
const Record = require('../models/Record')
const upload = require('../middleware/upload')

const uploadMultiple = upload.fields([{name: 'imageData', maxCount: 10}])

// Add Record
router.post('/add', uploadMultiple, async (req, res) => {  
    try{
        // create new record
        const newRecord = new Record({
            username: req.body.username,
            email: req.body.email || '',
            phone: req.body.phone
        })
        console.log(req.file);
        console.log(req.files);
        if(req.file) {
            console.log('inside:');
            console.log(req.file);
            newRecord.imageData = req.file.path;
        }
        //saving hashedrecord
        const record = await newRecord.save();
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
router.put('/:username', uploadMultiple, async (req, res) => {
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

module.exports = router;