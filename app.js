// Packages
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')

// Express Instance
const app = express()

app.use(session({
    secret: 'veryverysecret'
}))

// Data
// const user1 = {username:"admin", password:"password"}
// const username1 = "admin"
// const password1 = "password"
// const username2 = "kalle"
// const password2 = "grillkorv123"
let users = [
    {username:"admin", password:"password"}, 
    {username:"kalle", password:"grillkorv123"}, 
    {username:"olof", password:"asdf"}
]

let secrets = {
    kalle: "Äpple",
    olof: "Banan"
}

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
    let match = false
    // for(let i = 0; i < users.length; i++){
        // const user = users[i]
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
        const secret = secrets[ req.session.user ]
        res.render("secure", {secret})
    }else{
        res.status(403)
        res.send("Unauthorized!")
    }
})

// Start server
app.listen(5000, () => console.log("We rollin"))