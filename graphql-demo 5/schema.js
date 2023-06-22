import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import Db from './db.js';


const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Blog post',
    fields() {
        return {
            title: {type: GraphQLString},
            content: {type: GraphQLString},
            person: {
                type: PersonType,
                resolve(post) {
                    return post.getPerson();
                }
            }
        }
    }
});


const PersonType = new GraphQLObjectType({
    name: 'Person',
    description: 'This represents a Person',
    fields: () => {
        return {
            id: {type: GraphQLInt},
            firstName: {type: GraphQLString},
            lastName: {type: GraphQLString},
            email: {type: GraphQLString},
            posts: {
                type: new GraphQLList(PostType),
                resolve(person) {
                    return person.getPosts();
                }
            }
        };
    }
});


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        people: {
            type: new GraphQLList(PersonType),
            description: 'List of Persons',
            args: {
                id: {type: GraphQLInt},
                email: {type: GraphQLString}
            },
            resolve(root, args) {
                return Db.models.person.findAll({where: args});
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            description: 'List of All Posts',
            resolve(root, args) {
                return Db.models.post.findAll({where: args});
            }
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({

        addPerson: {
            type: PersonType,
            description: 'Add a Person',
            args: {
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(source, args) {
                return Db.models.person.create({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email.toLowerCase()
                });
            }
        },

        addPost: {
            type: PostType,
            description: 'Add a new Post',
            args: {
                userId: {type: new GraphQLNonNull(GraphQLInt)},
                title: {type: new GraphQLNonNull(GraphQLString)},
                content: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(source, args) {
                return Db.models.person.findByPk(args.userId).then(user => {
                    return user.createPost({
                        title: args.title,
                        content: args.content
                    });
                });
            }
        }

    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

export default schema;