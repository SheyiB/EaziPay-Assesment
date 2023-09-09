const express = require('express')

const app = express()
const dotenv = require('dotenv')
const { ApolloServer} = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolver/index')
const db = require('../config/db')
const userModel = require('./model')

dotenv.config({ path: './config/.env'})

app.use(express.json())

db();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return {userModel};
    }
})

server.start()

server.applyMiddleware({ app, path: '/api'});

app.get('/', (req, res) => res.send('Hello World!'))

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`App Running on PORT : ${PORT}`)
})