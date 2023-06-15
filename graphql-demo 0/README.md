## Express GraphQL

```
npm i express
npm i graphql
npm i express-graphql
```

http://localhost:3000/graphql

```
query {
  getAllBooks {
    id
    title
    description
    author {
      id
      firstName
      lastName
    }
  }
  getBook(id: 2) {
    id
    title
    author {
      id
      firstName
      lastName
    }
  }
}

mutation {
  addBook(book: {title: "Java", description: "about Java"}) {
    id
    title
    description
    author {
      id
      firstName
      lastName
    }
  }
}
```