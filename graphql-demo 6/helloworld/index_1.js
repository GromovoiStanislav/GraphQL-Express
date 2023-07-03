import {graphql, buildSchema} from "graphql";

const schema = buildSchema(`
  type Query {
    message: String
    hello: String
  }
`);

const resolvers = () => {
    const message = () => {
        return "Hello World";
    };

    const hello = () => {
        return "World";
    };

    return {
        message,
        hello
    };
};

// execute the query:

// graphql({
//     schema,
//     rootValue: resolvers(),
//     source: "{message}",
// }).then((response) => {
//     console.log(response);
// });

const executeQuery = async () => {
    let result = await graphql({schema, rootValue: resolvers(), source: "{message}"})
    console.log(result)
    // Prints
    // {
    //   data: { message: "Hello World" }
    // }

    result = await graphql({schema, rootValue: resolvers(), source: "{hello}"})
    console.log(result)
    // Prints
    // {
    //   data: { hello: 'World' }
    // }
}

executeQuery()

