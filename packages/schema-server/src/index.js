const express = require('express')

const app = express()

const connectDB = require('../config/db')


app.use(express.json())

connectDB()

app.get('/', (req, res) => res.status(200).send('Welcome to the Schema Server!'))

const PORT = 8089

app.listen(PORT, ()=>{
    console.log(`App Running on PORT : ${PORT}`)
})