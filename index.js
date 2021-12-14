const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const { extname } = require('path')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine) // defind handlebars engine before usage
app.set('view engine', 'hbs') // use handlebars engine
app.set('views', 'views') // here we say handlebars where will store view. by default it is views folder

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

const PORT = process.env.PORT || 3000
app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`)
})