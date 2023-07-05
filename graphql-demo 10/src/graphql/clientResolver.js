import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString,} from 'graphql';

import Project from '../models/Project.js';
import Client from '../models/Client.js';
import {ClientType} from "./clientType.js";


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


export const ClientMutation = {
    fields: {
        // Add a client
        addClient: {
            type: ClientType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                phone: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve: async (parent, args) => {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            },
        },
        // Delete a client
        deleteClient: {
            type: ClientType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: async (parent, args) => {
                Project.find({clientId: args.id}).then((projects) => {
                    projects.forEach((project) => {
                        project.deleteOne();
                    });
                });
                // await Project.deleteMany({clientId: args.id})
                return Client.findByIdAndRemove(args.id);
            },
        },
        // Update a client
        updateClient: {
            type: ClientType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                phone: {type: GraphQLString},
            },
            resolve: async (parent, args) => {
                return Client.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            email: args.email,
                            phone: args.phone,
                        },
                    },
                    {new: true}
                );
            },
        },
    },
};