const { buildSchema } = require('graphql');

const schema = buildSchema(`
    
    type User {
        id: ID
        username: String
        age: Int
        posts: [Post]
    }
    type Post {
        id: ID
        title: String
        content: String
    }
    
    input UserInput {
        id: ID
        username: String!
        age: Int!
    }
    input PostInput {
        id: ID
        userId: ID!
        title: String!
        content: String!
    }
    
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }
    type Mutation {
        createUser(input: UserInput): User
        createPost(input: PostInput): Post
    }

`);

module.exports = schema;
