const express = require('express')
const expressLayout = require('express-layouts')

const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(expressLayout)
app.use(express.static('./public'))


app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        layout: 'layouts/main'
    })
})

app.listen(port, () => {
    console.log('listen')
})