import {GraphQLObjectType, GraphQLSchema, GraphQLString,} from 'graphql';


import {ProjectMutation, ProjectQuery} from "./projectResolver.js";
import {ClientMutation, ClientQuery} from "./clientResolver.js";


// Queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        authorization: {
            type: GraphQLString,
            resolve: async (parent, args, ctx) => {
                return ctx.token;
            },
        },
        ...ClientQuery.fields,
        ...ProjectQuery.fields,
    },
});


// Mutations
const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        ...ClientMutation.fields,
        ...ProjectMutation.fields,
    },
});


export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});