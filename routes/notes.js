var express = require('express');
var router = express.Router();
const fs = require('fs');
const filePath = "data/notes.json";
var fileUpload = require('express-fileupload');

router.use(fileUpload({}));

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* GET ID card */
router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    const content = fs.readFileSync(filePath, "utf8");
    const notes = JSON.parse(content);
    let note = null;

    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
            note = notes[i];
            break;
        }
    }

    if (note) {
        res.render('page_card', { note:note });
    } else {
        res.status(404).send();
    }
});

/* POST EDIT by ID card */
router.post('/:id/edit', function (req, res, next) {

    const id = req.params.id

    if (!id) {
        return res
            .status(400)
            .json({message: 'Not found'})
    }

    const title = req.body.title;
    const description = req.body.description;
    let picture = ''

    if(req.files){
        let sampleFile =req.files.photo;
        picture = sampleFile.name
        sampleFile.mv('public/images/'+req.files.photo.name);
    }

    let data = fs.readFileSync(filePath, "utf8");
    const notes = JSON.parse(data);
    let note;

    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
            note = notes[i];
            break;
        }
    }

    if (note) {
        note.title = title;
        note.description = description;

        if(picture){ console.log(picture);
            note.picture = picture;}

        data = JSON.stringify(notes);
        fs.writeFileSync(filePath, data);
        res.render('page_card', { note:note });
    } else {
        return res
            .status(400)
            .json({message: 'There is no note with provided ID'})
    }
});

/* POST DELETE by ID card */
router.get('/:id/delete', async (req, res, next) => {

    const id = req.params.id

    if (!id) {
        return res
            .status(400)
            .json({message: 'Existing promotions ID must be provided'})
    }

    let data = fs.readFileSync(filePath, "utf8");
    let notes = JSON.parse(data);

    let index = -1;

    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        const product = notes.splice(index, 1)[0];
        data = JSON.stringify(notes);
        fs.writeFileSync(filePath, data);

        res.render('index',{notes:notes});

    } else {
        return res
            .status(400)
            .json({message: 'There is no promotion with provided ID'})
    }

})

router.post('/:id/delete-pic',async (req,res)=>{

    const id = req.params.id
    if (!id) {
        return res
            .status(400)
            .json({message: 'Not found'})
    }

    let data = fs.readFileSync(filePath, "utf8");
    const notes = JSON.parse(data);
    let note;

    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
            note = notes[i];
            break;
        }
    }

    if (note) {

        note.picture ='';
        data = JSON.stringify(notes);
        fs.writeFileSync(filePath, data);
        res.render('page_card', { note:note });
    } else {
        return res
            .status(400)
            .json({message: 'There is no note with provided ID'})
    }
})

module.exports = router;
