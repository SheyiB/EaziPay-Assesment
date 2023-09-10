const express = require('express')

const app = express()
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config({ path: './config/.env'})

app.use(express.json())

connectDB()

app.get('/', (req, res) => res.send('Welcome to the Schema Server!'))

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`App Running on PORT : ${PORT}`)
})