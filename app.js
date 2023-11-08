const express = require('express')
const expressLayout = require('express-layouts')
require('./utils/db')
const Contacts = require('./model/ContactModel')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(expressLayout)
app.use(express.static('./public'))
app.use(express.urlencoded({extended: true}))


app.get('/', async (req, res) => {
    // const contact = {
    //     nama: 'adrian',
    //     noHp: '081383838383',
    //     email: 'adrian@gmail.com',
    //     info: 'orang jakarta'
    // }
    const Contacts = await Contacts.find()
    res.render('home', {
        title: 'Home',
        layout: 'layouts/main',
        Contatcs,
    })
})

app.listen(port, () => {
    console.log('listen')
})