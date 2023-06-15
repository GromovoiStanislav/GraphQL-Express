## Express GraphQL

```
npm i express
npm i graphql
npm i express-graphql
```

http://localhost:3000/graphql

```
query {
  books {
    id
    name
    authorId
    author {
      id
      name
    }
  }
  authors {
    id
    name
    books {
      id
      name
      authorId
    }
  }
}

mutation {
  addAuthor(name: "Tom") {
    id
    name
  }
}


mutation {
  addBook(name: "JAVA", authorId: 4) {
    id
    name
    author {
      id
      name
    }
  }
}
```