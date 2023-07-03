## graphql-http and @graphql-tools/schema with Mongoose

```
npm i express
npm i graphql
npm i graphql-http
npm i @graphql-tools/schema
```

```
query Hello {
  hello
}

query Greet {
  greet(name: "Lily")
}

query Tasks {
  Tasks {
    _id
    title
    description
    number
  }
}

mutation CreateTask {
  createTask(
    input: { title: "create a title", description: "description", number: 100 }
  ) {
    _id
    title
    description
    number
  }
}

mutation CreateUser {
  createUser(input: { firstname: "Toma", lastname: "Tomson", age: 30 }) {
    _id
    firstname
    lastname
    age
  }
}

query Users {
  Users {
    _id
    firstname
    lastname
  }
}

query GetUser {
  getUser(_id: "64a282d8c3514ce0a9f65117") {
    _id
    firstname
    lastname
    age
  }
}

mutation UpdateUser {
  updateUser(_id: "64a282d8c3514ce0a9f65117", input: { age: 31 }) {
    _id
    firstname
    lastname
    age
  }
}

mutation deleteUser {
  deleteUser(_id: "64a282d8c3514ce0a9f65117") {
    _id
    firstname
    lastname
    age
  }
}
```