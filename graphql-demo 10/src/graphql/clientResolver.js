import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} from 'graphql';

import Project from '../models/Project.js';
import Client from '../models/Client.js';


// Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    }),
});

export const ClientQuery = {
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve: async (parent, args) => {
                return Client.find();
            },
        },
        client: {
            type: ClientType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve: async (parent, args) => {
                return Client.findById(args.id);
            },
        },
    },
};