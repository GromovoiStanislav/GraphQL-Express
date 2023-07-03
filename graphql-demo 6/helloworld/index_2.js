import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {

            hello: {
                type: GraphQLString,
                resolve() {
                    return 'World';
                },
            },

            helloWorld: {
                type: GraphQLString,
                resolve() {
                    return 'Hello World';
                },
            },

        },
    }),
});


// execute the query:

// const source = '{ hello }';
// graphql({ schema, source }).then((result) => {
//     console.log(result);
// });

const executeQuery = async () => {
    let result = await graphql({schema, source:'{ hello }'})
    console.log(result)
    // Prints
    // {
    //   data: { hello: "World" }
    // }

    result = await graphql({schema, source:'{ helloWorld }'})
    console.log(result)
    // Prints
    // {
    //   data: { helloWorld: 'Hello World' }
    // }
}

executeQuery()


