const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT
const mongoose = require('mongoose')
const colors = require('colors')
const morgan = require('morgan')

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