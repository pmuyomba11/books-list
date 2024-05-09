const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT
const mongoose = require('mongoose')
const colors = require('colors')
const morgan = require('morgan')
const Book = require('./models/Book')

//Middleware..
app.use(express.json())
app.use(morgan('dev'))

//DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL)

//ERROR & SUCCESS MESSAGES....
mongoose.connection.on('connected', () => {
    console.log('Database connected successfully..'.inverse.bold.blue)
    app.listen(port, () => {
        console.log(`Server running on PORT: ${port}....`.inverse.bold.green)
    })
})

mongoose.connection.on('error', (error) => {
    console.log('DATABASE connection error' + error.message)
})

//Routes........
//Create route.
app.post('/books', async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(422).json({ message: "Title is required." })
        }
        if (!req.body.author) {
            return res.status(422).json({ message: 'Author is required.' })
        }
        let completed = false;
        if(req.body.completed === 'on' || req.body.completed === true){
            completed = true
        }
        //Save the book to database.
        const bookCreated = await Book.create(req.body)
        return res.status(201).json(bookCreated)


    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})
