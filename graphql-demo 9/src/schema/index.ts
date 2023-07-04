import {GraphQLObjectType, GraphQLSchema} from "graphql";
import {GREETING} from "./queries/greeting.js";
import {GET_ALL_USERS, GET_USER} from "./queries/users.js";
import {CREATE_USER, DELETE_USER, UPDATE_USER, UPDATE_USER_PASSWORD} from "./mutations/users.js";

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        greeting: GREETING,
        getAllUsers: GET_ALL_USERS,
        getUser: GET_USER,
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: CREATE_USER,
        deleteUser: DELETE_USER,
        updateUser: UPDATE_USER,
        updateUserPassword: UPDATE_USER_PASSWORD,
    },
});

export const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
