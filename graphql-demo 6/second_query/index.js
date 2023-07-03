import express from 'express';
import {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList} from 'graphql';
import {createHandler} from 'graphql-http/lib/use/express';

// importing data
//import {courses} from './data.json';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const {courses} = require('./data.json');


const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        author: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        topic: {type: new GraphQLNonNull(GraphQLString)},
        url: {type: new GraphQLNonNull(GraphQLString)},
    })
})


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {

            getCourse: {
                type: CourseType,
                args: {
                    id: {type: GraphQLInt}
                },
                resolve: (parent, args) => courses.find(course => course.id === args.id)
            },

            getCourses: {
                type: new GraphQLList(CourseType),
                args: {
                    topic: {type: GraphQLString}
                },
                resolve: (parent, args) => {
                    if (args.topic) {
                        let topic = args.topic;
                        return courses.filter(course => course.topic === topic);
                    } else {
                        return courses;
                    }
                }
            },

        },
    }),


    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {

            updateCourseTopic: {
                type: CourseType,
                args: {
                    id: {type: new GraphQLNonNull(GraphQLInt)},
                    topic: {type: new GraphQLNonNull(GraphQLString)},
                },
                resolve: (parent, args) => {
                    courses.map(course => {
                        if (course.id === args.id) {
                            course.topic = args.topic;
                            return course;
                        }
                    });
                    return courses.find(course => course.id === args.id);
                }
            },

        },
    }),

});


const app = express();
app.all('/graphql', createHandler({schema}));

await app.listen({port: 3000});
console.log('Listening to port 3000');