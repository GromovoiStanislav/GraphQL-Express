const express = require("express");
const {createHandler} = require('graphql-http/lib/use/express');

const schema = require("./graphql/schema");
const {authenticate, getUserFromJWT} = require("./middleware/auth");

const app = express();

app.use(authenticate); // for GraphQL doesn't  work !!!

app.get("/", (req, res) => res.json({msg: "Welcome. Go to /graphql"}));

app.all('/graphql', createHandler({
    schema,
    context: (req) => ({verifiedUser: getUserFromJWT(req)})
}))

module.exports = app;