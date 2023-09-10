
const { gql} = require('apollo-server-express')

module.exports = gql`
type User {
    id: ID!
    email: String!
    password: String!
    name: String!
    number: String!
    
}

type Query {
    user: [User!]!,
    useraccount(id: ID!): User!
}

type Mutation {
    signUp(name: String!, email: String!, password: String, number: String!): String!
    signIn(name: String, email: String, password: String!): String!
    createUser(email: String!, password: String, name: String, number: String): User!
}

`
