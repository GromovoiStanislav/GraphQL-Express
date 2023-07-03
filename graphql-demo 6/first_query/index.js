import express from 'express';
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {

            message: {
                type: GraphQLString,
                resolve: () => 'Hello World!',
            },

            hello: {
                type: GraphQLString,
                resolve: () => 'world',
            },

        },
    }),
});



const app = express();
app.all('/graphql', createHandler({ schema }));

await app.listen({ port: 3000 });
console.log('Listening to port 3000');