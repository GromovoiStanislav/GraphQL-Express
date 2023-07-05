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



// Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId);
            },
        },
    }),
});

export const ProjectQuery = {
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve: async (parent, args) => {
                return Project.find();
            },
        },
        project: {
            type: ProjectType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve: async (parent, args) => {
                return Project.findById(args.id);
            },
        },
    },
};