const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const axios = require("axios");


const userRoute = require("./route/router");


dotenv.config();

const app = express();


const port = process.env.PORT || 5000;


// connecting database
const connection = async() => {
    try {
        await mongoose.connect(process.env.mongoDB_URI,
            {useUnifiedTopology: true,
            useNewUrlParser:true
        })
        console.log("mongoDB connection established...");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
connection();


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// api router
app.use('/api/tweetuser', userRoute);


// setting view engine
app.set('view engine', 'ejs');

// embedding assets file
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/jquery', express.static(path.resolve(__dirname, 'assets/jquery')));

app.get('/', (req, res) => {
    axios.get("http://localhost:2000/api/tweetuser")
    .then(function (response) {
        res.render('index', { users: response.data });
    })
    .catch(err => {
        res.send(err);
    })
})

app.get('/adduser', (req, res) => {
    res.render('addUser');
})



app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})