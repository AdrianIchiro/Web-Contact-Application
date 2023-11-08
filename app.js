const express = require('express')
const expressLayout = require('express-layouts')

const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(expressLayout)
app.use(express.static('./public'))


app.get('/', (req, res) => {
    const contact = {
        nama: 'adrian',
        noHp: '081383838383',
        email: 'adrian@gmail.com',
        info: 'orang jakarta'
    }
    res.render('home', {
        title: 'Home',
        contact,
        layout: 'layouts/main',
        
    })
})

app.listen(port, () => {
    console.log('listen')
})