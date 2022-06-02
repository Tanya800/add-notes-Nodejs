var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');
var fileUpload = require('express-fileupload');

const filePath = "data/notes.json";

router.use(fileUpload({}));

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('page_add',{});
});

/* POST add new card */
router.post('/save', function (req, res, next) {
    try {

        const title = req.body.title
        const description = req.body.description
        let picture = ''

        if(req.files){
            let sampleFile =req.files.photo;
            picture = sampleFile.name
            sampleFile.mv('public/images/'+req.files.photo.name);
        }

        let data = fs.readFileSync(filePath, "utf8");
        let notes = JSON.parse(data);
        var now = new Date().toLocaleDateString();

        const new_note = {
            id: notes.length + 1,
            title:title,
            description:description,
            picture:picture,
            date:now
        }

        const id = Math.max.apply(Math, notes.map(function (o) {
            return o.id;
        }))

        new_note.id = id + 1;
        let tempId = new_note.id

        notes.push(new_note);
        data = JSON.stringify(notes);
        fs.writeFileSync(filePath, data);
        res.render('page_card', { note:new_note });

    } catch (e) {
        console.log('*** Create note')
        next(e)
    }
});

module.exports = router;
