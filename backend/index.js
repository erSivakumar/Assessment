const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const User= require('./models/ReactDataSchema')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());
mongoose.connect('mongodb://localhost:27017/reactdata', { useNewUrlParser: true });

app.post('/register', async(req, res) => {
    let userName = req.body.userName
    let password = req.body.password
    const formData = new User({
        userName,
        password
    })
    try {
        await formData.save();
        let data = {
            status :true,
            message :"Record inserted successfully."
        }
        res.send(data)
    } catch(err) {
        console.log(err)
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});