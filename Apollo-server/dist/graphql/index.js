import { paymentMethods, users } from "../data/index.js";
export const typeDefs = `#graphql
  type Query {
    getHello: String
    getUsers: [User]
    getUserById(id: ID!): User
  }
  type Mutation {
    createUser(id: ID!, name: String!, email: String!, age: Int!): User
    createPaymentMethod(
      id: ID!
      last4: String
      expMonth: Int
      expYear: Int
      userId: ID!
    ): PaymentMethod
  }
  type User {
    id: ID!
    name: String
    email: String
    age: Int
    paymentMethod: [PaymentMethod]
  }
  type PaymentMethod {
    id: ID!
    last4: String
    expMonth: Int
    expYear: Int
    userId: String
  }
`;
export const resolvers = {
    Query: {
        getHello: () => "Hello, World!",
        getUsers: () => users,
        getUserById: (parent, args) => {
            const { id } = args;
            return users.find((user) => user.id === id);
        },
    },
    Mutation: {
        createUser: (parent, args) => {
            const { id, name, email, age } = args;
            const newUser = { id, name, email, age };
            users.push(newUser);
            return newUser;
        },
        createPaymentMethod: (parent, args) => {
            paymentMethods.push(args);
            return args;
        },
    },
    User: {
        paymentMethod: (parent) => {
            return paymentMethods.filter((payment) => payment.userId === parent.id);
        },
    },
};
