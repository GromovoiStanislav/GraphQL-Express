const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./Schemas/index");

const app = express();
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.listen(3000, () => {
    console.log("Server ready at http://localhost:3000/graphql");
});
