import {GraphQLID, GraphQLObjectType, GraphQLString} from 'graphql';

import Client from "../models/Client.js";
import {ClientType} from "./clientType.js";


// Project Type
export const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent) {
                return Client.findById(parent.clientId);
            },
        },
    }),
});