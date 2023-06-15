const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const {readFileSync} = require('node:fs');


const schemaString = readFileSync('./schema.graphql', {encoding: 'utf8'});
const schema = buildSchema(schemaString);

const allBooks = [
    {
        id: '1',
        title: 'Another awesome book',
        description: '123',
        author: {
            id: '1',
            firstName: 'Alex',
            lastName: 'Kislov'
        }
    },
    {
        id: '2',
        title: 'Awesome book',
        description: '123',
        author: {
            id: '1',
            firstName: 'Alex',
            lastName: 'Kislov'
        }
    }
];

const root = {
    getAllBooks: () => {
        return allBooks;
    },
    getBook: params => {
        return allBooks.find(({id}) => params.id === id);
    },
    addBook: params => {
        const newBook = {
            id: allBooks.length + 1,
            ...params.book,
            author: {
                id: '1',
                firstName: 'Alex',
                lastName: 'Kislov'
            }
        }
        allBooks.push(newBook);

        return newBook;
    }
};


const app = express();
app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
);
app.listen(3000);
console.log('Running a GraphQL API server at http://localhost:3000/graphql');
