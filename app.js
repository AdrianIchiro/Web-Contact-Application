const express = require('express')
const expressLayout = require('express-layouts')
require('./utils/db')
const Contacts = require('./model/ContactModel')
const {validationResult, body, check, cookie} = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const cookies = require('cookie-parser')
var methodOverride = require('method-override')


const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(expressLayout)
app.use(express.static('./public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))


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
        status: req.flash('status'),
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
        req.flash('status', 'add')
        res.redirect('/')
    }
})

app.delete('/delete', (req, res) => {
    Contacts.deleteOne({nama: req.body.nama}).then((value) => {
        req.flash('success', 'data berhasil di hapus')
        req.flash('status', 'delete')
        res.redirect('/')
    })
})

app.put('/update', [
    body('nama').custom(async (value, {req}) => {
        const duplicate = await Contacts.findOne({nama: value})
        if (value !== req.body.oldnama && duplicate) {
            throw new Error('nama sudah digunakan')
        }
        return true
    }),
    check('noHp', 'nomor tidak valid').isMobilePhone('id-ID'),
    check('email', 'email tidak valid').isEmail()
], (req, res) => {
    const value = validationResult(req)
    if (!value.isEmpty()) {
        res.render('update', {
            title: 'add',
            layout: 'layouts/main',
            contact: req.body,
            error: value.array()
        })
    } else {
        Contacts.updateOne({_id: req.body._id}, {
            $set: {
                nama: req.body.nama,
                noHp: req.body.noHp,
                email: req.body.email
            }
        }).then((result) => res.redirect('/'))
    }
})

app.get('/update/:nama', async (req, res) => {
    const contact = await Contacts.findOne({nama: req.params.nama})
    res.render('update', {
        title: 'add',
        layout: 'layouts/main',
        contact,
    })
})



app.listen(port, () => {
    console.log('listen')
})