const express = require("express");
const {createHandler}  = require('graphql-http/lib/use/express');
const schema = require("./Schemas/index");


const app = express();
app.all('/graphql', createHandler({ schema }));

app.listen(3000, () => {
    console.log("Server ready at http://localhost:3000/graphql");
});
