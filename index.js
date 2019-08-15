const express = require("express");
const path = require('path');
const app = express();
const user = require('./model/user');
const mongoose = require('mongoose');

//connect to a mongodb db
mongoose.connect('mongodb://localhost:27017/apiDev', {useNewUrlParser: true}, ()=> console.log("db connected!"));
let db = mongoose.connection;
db.on('error', ()=> console.log("mongodb connection error"));
// set static folder
app.use('/static',express.static(path.join(__dirname,'public')));

// body parser to handle post requests
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// routes
app.get('/', (req, res) => res.send("<h1>Hi there!!<h1>"));
//
app.get('/users', async(req, res) => res.json( await user.find()));
//
app.post('/users/add', (req, res) => {
    // save data based on the model
    console.log(req.body)
    user.create(req.body)
    .then((data)=> res.json(user))
    .catch(err=> console.log(err));
})
//
app.delete('/:name', async(req, res) => res.json(await user.deleteMany({name: req.params.name})))

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log("server started"));