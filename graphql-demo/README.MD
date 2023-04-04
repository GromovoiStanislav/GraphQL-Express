## Express-GraphQL

```
npm i express
npm i graphql
npm i express-graphql
```

http://localhost:3000/graphql

create new user:

```
mutation {
  createUser(input: {username: "Olga", age: 35}) {
    id
    username
  }
}
```

create new post:

```
mutation {
  createPost(input: {title: "JavaScript", content: "Top 10", userId: 1}) {
    id
    title
    content
  }
}
```

get all users:

```
query {
  getAllUsers {
    id
    username
    age
    posts {
      id
      title
      content
    }
  }
}
```

get one users:

```
query {
  getUser(id: 1) {
    id
    username
    age
    posts {
      id
      title
      content
    }
  }
}
```
