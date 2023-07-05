import {GraphQLID, GraphQLObjectType, GraphQLString,} from 'graphql';

import {GraphQLList} from "graphql/index.js";
import {ProjectType} from "./projectType.js";
import Project from '../models/Project.js';

// Client Type
export const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent) {
                return Project.find({clientId: parent.id});
            },
        },
    }),
});
