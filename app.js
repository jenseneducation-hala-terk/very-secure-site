// Packages
const express = require('express')
const cookieParser = require('cookie-parser')

// Express Instance
const app = express()

// Enable view rendering with EJS
app.set("view engine", "ejs") 
// Enable cookie header API
app.use(cookieParser()) 
// Enable request body parsing
app.use(express.urlencoded()) 


// Serve main page
app.get('/', (req,res) => {
    res.render("index")
})

// Handle authentication request
app.post('/login', (req,res) => {
    if(req.body.username == "admin" && req.body.password == "letmein"){
        res.cookie("loggedIn", "true")
        res.redirect('/secure')
    }else{
        res.status(403)
        res.send("Invalid Credentials")
    }
})

// Secured route
app.get('/secure', (req,res) => {
    if(req.cookies.loggedIn == "true"){
        res.render("secure")
    }else{
        res.status(403)
        res.send("Unauthorized!")
    }
})

// Start server
app.listen(5000, () => console.log("We rollin"))