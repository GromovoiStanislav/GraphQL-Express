const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();
app.use(cors());

const users = [
  { id: 1, username: 'Vasya', age: 25 },
  { id: 2, username: 'Ivan', age: 20 },
  { id: 3, username: 'Oleg', age: 24 },
];

const createUser = (input) => {
  const id = Date.now();
  return {
    id,
    username: input.username,
    age: input.age,
  };
};

const createPost = (input) => {
  const id = Date.now();
  return {
    id,
    title: input.title,
    content: input.content,
  };
};

const root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id == id);
  },
  createUser: ({ input }) => {
    const user = createUser(input);
    users.push(user);
    return user;
  },
  createPost: ({ input }) => {
    const post = createPost(input);
    const user = users.find((user) => user.id == input.userId);
    if (!user.posts) {
      user.posts = [];
    }
    user.posts.push(post);

    return post;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

app.listen(3000, () => console.log('server started on port 3000'));
