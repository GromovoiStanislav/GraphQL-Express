## Express GraphQL with Sequelize

```
npm i express
npm i graphql
npm i graphql-http
```

POST http://localhost:3000/graphql

```
 query  {
     
     onePeople: people(id:1) {
        id
        firstName
        lastName
        email
        posts {
            title
        }
    }

    people {
        id
        firstName
        lastName
        email
        posts {
            title
        }
    }

    posts{
        title
        content
        person {
            id
            firstName
        }
    }
}

mutation {
  addPerson(firstName: "Tom", lastName: "lastName", email: "tom@email.ru") {
    id
    firstName
    lastName
    email
  }
}

mutation {
  addPost(userId: 11, title: "title", content: "content") {
    title
    content
    person {
        id
        firstName
    }
  }
}
```