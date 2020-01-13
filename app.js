// Packages
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config()

// Express Instance
const app = express()

app.use(session({
    secret: process.env.SECRET
}))



// Data
// Enable view rendering with EJS
app.set("view engine", "ejs") 
// Enable cookie header API
app.use(cookieParser()) 
// Enable request body parsing
app.use(express.urlencoded()) 
//
app.use(express.static('public'))

// Serve main page
app.get('/', (req,res) => {
    res.render("index")
})

// Handle authentication request
app.post('/login', (req,res) => {
    let match = false

    // const users = DATA FROM data/users.json

    for(let user of users){
        
        if(req.body.username == user.username && req.body.password == user.password){
            match = true
            req.session.user = user.username
            // res.cookie("user", user.username)
            res.redirect('/secure')
            break;
        }
    }
    if(match == false){
        res.status(403)
        res.send("Invalid Credentials")

    }
})

// Secured route
app.get('/secure', (req,res) => {
    if(req.session.user){
        // const secrets = DATA FROM data/secrets.json
        const secret = secrets[ req.session.user ]
        res.render("secure", {secret})
    }else{
        res.status(403)
        res.send("Unauthorized!")
    }
})

// Start server
app.listen(5000, () => console.log("We rollin"))