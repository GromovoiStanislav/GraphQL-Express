## graphql-http (ts) with Express, TypeORM

```
query Greeting {
  greeting(name: "Tom")
}

mutation CreateUser {
  createUser(name: "Tom", username: "tom", password: "23") {
    ...UserData
  }
}

mutation UpdateUser {
  updateUser(id: 1, input: { name: "Lily", username: "lily" }) {
    message
    success
  }
}

mutation UpdateUserPassword {
  updateUserPassword(id: 1, input: { oldPassword: "23", newPassword: "abc" }) {
    message
    success
  }
}

mutation DeleteUser {
  deleteUser(id: 1) {
    message
    success
  }
}

query GetAllUsers {
  getAllUsers {
    ...UserData
  }
}

query GetUser {
  getUser(id: 1) {
    ...UserData
  }
}

fragment UserData on User {
  id
  name
  username
  password
}
```
