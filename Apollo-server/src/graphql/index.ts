import { paymentMethods, users } from "../data/index.js";
import { PaymentMethod, User, UserArgsType } from "../utils/types.js";

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

    getUserById: (parent: any, args: UserArgsType) => {
      const { id } = args;
      return users.find((user: User) => user.id === id);
    },
  },

  Mutation: {
    createUser: (parent: any, args: UserArgsType) => {
      const { id, name, email, age } = args;
      const newUser: User = { id, name, email, age };
      users.push(newUser);
      return newUser;
    },

    createPaymentMethod: (parent: any, args: PaymentMethod) => {
      paymentMethods.push(args);
      return args;
    },
  },

  User: {
    paymentMethod: (parent: User) => {
      return paymentMethods.filter((payment) => payment.userId === parent.id);
    },
  },
};
