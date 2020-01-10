const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.set("view engine", "ejs")
app.use(cookieParser())
app.use(express.urlencoded())

app.get('/', (req,res) => {
    res.render("index")
})

app.post('/login', (req,res) => {
    if(req.body.username == "admin" && req.body.password == "letmein"){
        res.cookie("loggedIn", "true")
        res.redirect('/secure')
    }else{
        res.status(403)
    }
})

app.get('/secure', (req,res) => {
    if(req.cookies.loggedIn == "true"){
        res.render("secure")
    }else{
        res.status(403).send("")
    }
})

app.listen(5000, () => console.log("We rollin"))