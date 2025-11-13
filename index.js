const express = require('express');
const session = require('express-session')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret : 'bola',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}))

app.listen(3010);

app.get('/', (req, res) => {
    if (req.session.cookie.secure === true){
    res.sendFile(__dirname + '/ui/index.html')
    } else {
        res.redirect('/login')
    }
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/ui/login.html')
})

app.post('/login', (req, res) => {
   const { usuario, senha } = req.body

   if(usuario =="senai"  && senha == "123"){
        req.session.cookie.secure = true;
        res.redirect('/')
   }
   else{
    res.redirect('/login')
   }
})

app.get('/sair', (req, res) => {
    req.session.destroy();
    res.redirect('/login')
})