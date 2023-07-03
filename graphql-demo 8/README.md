## GraphQL Blog API with Authentication and Mongoose

```
npm i express
npm i graphql
npm i graphql-http
```

```
query Users {
  users {
    id
    username
    displayName
    email
    posts {
      id
      title
    }
  }
}

query User {
  user(id: "64a29049dbf0cad72bfdaa35") {
    id
    username
    displayName
    email
    posts {
      id
      title
    }
  }
}

query Posts {
  posts {
    id
    title
    body
    author {
      username
    }
    comments {
      comment
    }
  }
}

query Post {
  post(id: "64a29b96e5751b24bab6d9fa") {
    id
    title
    body
    author {
      username
    }
    comments {
      comment
    }
  }
}

query Comments {
  comments {
    id
    comment
    user {
      username
    }
    post {
      title
    }
  }
}

query Comment {
  comment(id: "64a2a9a67463e30c22344293") {
    id
    comment
    user {
      username
    }
    post {
      title
    }
  }
}


mutation Register {
  register(
    username: "tom"
    email: "tom@mail.com"
    password: "123"
    displayName: "Tom"
  )
}

mutation Login {
  login(email: "toma@mail.com", password: "123")
}


Headers:
Authorization: "Bearer token"

mutation CreatePost {
  createPost(title: "Title 1", body: "body") {
    id
    title
    body
    author {
      username
    }
  }
}

mutation UpdatePost {
  updatePost(postId: "64a2a1d63436fd4829c61c63", body: "body.....") {
    id
    title
    body
    author {
      username
    }
  }
}

mutation DeletePost {
  deletePost(postId: "64a29b96e5751b24bab6d9fa")
}


mutation AddComment {
  addComment(postId: "64a29e9b7011c02840b34fca", comment: "comment 2") {
    id
    comment
  }
}

mutation UpdateComment {
  updateComment(id: "64a2a9ab7463e30c22344295", comment: "Comment...") {
    id
    comment
  }
}

mutation DeleteComment {
  deleteComment(id: "64a2a9a67463e30c22344293")
}
```
