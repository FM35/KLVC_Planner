const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routesHandler = require('./routes/handler.js');
const bodyParser = require('body-parser');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/', routesHandler);
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

gfs = Grid(connection, mongoose.mongo);
gfs.collection('uploads');

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = gfs;