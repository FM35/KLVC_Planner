const router = require('express').Router();
const Schemas = require('../models/Schemas.js');
const { GridFsStorage } = require('multer-gridfs-storage');

const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

require('dotenv').config();
const uri = process.env.ATLAS_URI;

// Create storage engine
const storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });


router.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file })
});


router.get('/users', (req, res) => {

    const users = Schemas.Users;

    users.find()
        .then(userTable => res.json(userTable))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/posts', (req, res) => {

    const posts = Schemas.Posts;

    posts.find()
        .then(postsTable => res.json(postsTable))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/addUser', (req, res) => {

    const username = req.body.username;
    const newUser = new Schemas.Users({ username });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));

    //res.end('User added!');
});

router.post('/addPost', (req, res) => {
    const username = req.body.username;
    const graphic = req.body.graphic;
    const description = req.body.description;
    const start_date = Date.parse(req.body.start_date);
    const end_date = Date.parse(req.body.end_date);
    const frequency = req.body.frequency;

    const newPost = new Schemas.Posts({
        username,
        graphic,
        description,
        start_date,
        end_date,
        frequency
    });

    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;