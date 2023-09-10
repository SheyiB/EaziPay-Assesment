const express = require('express')

const app = express()
const dotenv = require('dotenv')
const { ApolloServer} = require('apollo-server-express')
const typeDefs = require('schema-server/src/schema')

const resolvers = require('./resolver/index')
const connectDB = require('schema-server/config/db')
const userModel = require('./model')
const jwt = require('jsonwebtoken');


dotenv.config({ path: './config/.env'})

app.use(express.json())

connectDB()


const getUser = token => {
    if (token){
        try{
            return jwt.verify(token, process.env.JWT_SECRET);
        }
        catch (err) {
            throw new Error('Session invalid');
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization;

        const user = getUser(token);

        return {userModel, user};
    }
})

server.start()

server.applyMiddleware({ app, path: '/api'});

app.get('/', (req, res) => res.send('Hello World!'))

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`App Running on PORT : ${PORT}`)
})