## Express GraphQL

```
npm i express
npm i graphql
npm i graphql-http
//npm i express-graphql
```

http://localhost:3000/graphql

```
{
  getAllUserById(id: 1) {
    id
    firstName
    lastName
    email
    password
  }
  getAllUsers {
    id
    firstName
    lastName
    email
    password
  }
}  

mutation {
  createUser(firstName: "Tomas", lastName: "Don", email: "tomas@mail.ru", password: "123") {
    id
  }
}
```