
var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()
const path = require("path")

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))
mongoose.connect('mongodb://localhost:27017/Intern')
var db = mongoose.connection
db.on('error', () => console.log("Error in Connecting to Database"))
db.once('open', () => console.log("Connected to Mongo Database"))


app.post("/sign_up", (req, res) => {
    var name = req.body.name
    var age = req.body.age
    var email = req.body.email
    var password = req.body.password
    var data = {
        "name": name,
        "age": age,
        "email": email,
        "password": password
    }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted succesfully")
        //res.redirect('/signup_success.html');
    })
    return res.redirect('/signup_success')
})

app.get("/signup_success", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup_success.html'));
})

app.get("/", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": '*'
    })
    return res.redirect('index.html')
}).listen(5000);
console.log("Running on port 5000")

