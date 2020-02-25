// @ts-ignore
import mongoose = require('mongoose');
// @ts-ignore
import express = require('express');
// @ts-ignore
import path = require('path');
// @ts-ignore
import bodyParser = require('body-parser');
// @ts-ignore
import cors = require('cors');
// @ts-ignore
import multer = require('multer');

import {databaseName} from './environment';
import {userRoutes} from './routes/user.routes';
import {postRoutes} from './routes/post.routes';

const app = express();

// Setting up upload file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimeType === 'image/png' || file.mimeType === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// Set port number
const port = process.env.PORT || 3000;

// Connecting to database
mongoose.connect(databaseName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

// If there is a connection error with db
db.on('error', console.error.bind(console, 'connection error:'));

// If DB is opened successfully
db.once('open', () => {
    console.log('Connection Successful!');
});

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// for parsing multipart/form-data
app.use(upload.fields([{
    name: 'img', maxCount: 1
}, {
    name: 'coverImg', maxCount: 1
}, {
    name: 'img1', maxCount: 1
}, {
    name: 'img2', maxCount: 1
}, {
    name: 'img3', maxCount: 1
}]));
// Setting uploads path to public and adding to app
app.use(express.static('public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

// Adding backend URLS
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Start Server
app.listen(port, () => {
    console.log('Server started and listening on port ' + port);
});
