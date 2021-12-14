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

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная страница',
        isHome: true

    })
})
app.get('/add', (req, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    })
})
app.get('/courses', (req, res) => {
    res.render('courses', {
        title: 'Курсы',
        isCourses: true
    })
})

const PORT = process.env.PORT || 3000
app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`)
})