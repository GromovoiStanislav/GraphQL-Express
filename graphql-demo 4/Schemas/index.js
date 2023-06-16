const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = graphql;
const userData = require("../MOCK_DATA.json");

const UserType = require("./TypeDefs/UserType");
const e = require("express");

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: {id: {type: GraphQLInt}},
            resolve(parent, args) {
                if (args.id) {
                    return [userData.find(user => user.id === args.id)];
                } else {
                    return userData;
                }
            },
        },
        getAllUserById: {
            type: UserType,
            args: {id: {type: new GraphQLNonNull(GraphQLInt)}},
            resolve(parent, args) {
                return userData.find(user => user.id === args.id);
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                const user = {
                    id: userData.length + 1,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password,
                }
                userData.push(user);
                return user;
            },
        },
    },
});

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation});
