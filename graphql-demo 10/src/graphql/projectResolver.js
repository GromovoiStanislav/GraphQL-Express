import {GraphQLEnumType, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString,} from 'graphql';

import Project from '../models/Project.js';
import {ProjectType} from "./projectType.js";


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


export const ProjectMutation = {
    fields: {
        // Add a project
        addProject: {
            type: ProjectType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            new: {value: 'Not Started'},
                            progress: {value: 'In Progress'},
                            completed: {value: 'Completed'},
                        },
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: async (parent, args) => {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });

                return project.save();
            },
        },
        // Delete a project
        deleteProject: {
            type: ProjectType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: async (parent, args) => {
                return Project.findByIdAndRemove(args.id);
            },
        },
        // Update a project
        updateProject: {
            type: ProjectType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: {value: 'Not Started'},
                            progress: {value: 'In Progress'},
                            completed: {value: 'Completed'},
                        },
                    }),
                },
            },
            resolve: async (parent, args) => {
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                    {new: true}
                );
            },
        },
    },
};