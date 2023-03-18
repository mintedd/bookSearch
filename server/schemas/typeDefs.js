const { gql } = require('apollo-server-express');


const typeDefs = gql`

type User {
    _id: ID!
    username: String!
    email: String
    # bring in book count from the virtual
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
}

type Auth {
 token: ID!
 user: User
}

type BookInput {
    bookId: String!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
}
`;

module.exports = typeDefs;