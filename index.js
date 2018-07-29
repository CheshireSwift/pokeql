const { ApolloServer, gql } = require('apollo-server')

const books = [
    {
        title: 'blah',
        author: 'blahblah',
    },
    {
        title: 'wibble',
        author: 'wobble',
    }
]

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }
`

const resolvers = {
    Query: {
        books: () => books,
    },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(`server started on ${url}`)
})