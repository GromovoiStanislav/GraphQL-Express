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
            greeting: {
                type: GraphQLString,
                args:
                    {
                        name: {type: GraphQLString}
                    },
                resolve(parent, args) {
                    return `Hello ${args.name}`;
                },
            },
        },
    }),
});


const executeQuery = async () => {
    const result = await graphql({schema, source: '{greeting(name: "Tom")}'})
    console.log(result)
    // Prints
    // {
    //   data: { greeting: 'Hello Tom' }  }
    // }
}

executeQuery()


