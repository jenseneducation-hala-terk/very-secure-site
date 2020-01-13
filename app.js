// Packages
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const fs = require('fs')
require('dotenv').config()

// Data
const users = require('./data/users.json')
const secrets = require('./data/secrets.json')

// Express Instance
const app = express()

app.use(session({
    secret: process.env.SECRET
}))

// Enable view rendering with EJS
app.set("view engine", "ejs") 
// Enable cookie header API
app.use(cookieParser()) 
// Enable request body parsing
app.use(express.urlencoded()) 
//
app.use(express.static('public'))

// Serve main page with login form
app.get('/', (req,res) => {
    res.render("index")
})

// Handle authentication request
app.post('/login', (req,res) => {
    const user = users.find(user => user.username == req.body.username)
    if(user && user.password == req.body.password){
        req.session.user = user.username
        res.redirect('/secure')
    }else{
        res.status(403)
        res.send("Invalid Credentials")
    }
})

// Secured route displaying the users secret word
app.get('/secure', (req,res) => {
    if(req.session.user){
        const secret = secrets[ req.session.user ]
        res.render("secure", {secret})
    }else{
        res.status(403)
        res.send("Unauthorized!")
    }
})

// Route for updating secret word
app.post('/setword', (req,res)=> {
    if(req.session.user){        
        secrets[req.session.user] = req.body.word
        const newDataAsString = JSON.stringify(secrets)
        fs.writeFileSync("./data/secrets.json", newDataAsString)
        res.redirect('/secure')
    }else{
        res.status(403)
        res.send("Unauthorized!")
    }
})

// Start server
app.listen(5000, () => console.log("We rollin"))