const express = require('express')
const expressLayout = require('express-layouts')
require('./utils/db')
const Contacts = require('./model/ContactModel')
const {validationResult, body, check, cookie} = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const cookies = require('cookie-parser')

const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(expressLayout)
app.use(express.static('./public'))
app.use(express.urlencoded({extended: true}))



app.use(cookies('secret'))
app.use(session({
    cookie: {
        maxHeight: 6000,
    },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash());


app.get('/', async (req, res) => {
    // const contact = {
    //     nama: 'adrian',
    //     noHp: '081383838383',
    //     email: 'adrian@gmail.com',
    //     info: 'orang jakarta'
    // }
    const Contact = await Contacts.find()
    res.render('home', {
        title: 'Home',
        layout: 'layouts/main',
        flash: req.flash('success'),
        Contact,
    })
})

app.get('/add', (req, res) => {
   res.render('add', {
        title: 'Add',
        layout: 'layouts/main'
   })
})

app.post('/add', [
    body('nama').custom(async (value) => {
        const cek = await Contacts.findOne({nama: value})
        if(cek) {
            throw new Error('Nama sudah ada')
        } 
        return true
    }),
    check('noHp', 'no hp tidak valid').isMobilePhone('id-ID'),
    check('email', 'email tidak valid').isEmail()
], (req, res) => {
    if(!validationResult(req).isEmpty()) {
        res.render('add', {
            title: 'Add',
            layout: 'layouts/main',
            error: validationResult(req).array()
        })
    } else {
        Contacts.insertMany(req.body)
        req.flash('success', 'data berhasil ditambahkan')
        res.redirect('/')
    }
})

//  
// ],

app.listen(port, () => {
    console.log('listen')
})