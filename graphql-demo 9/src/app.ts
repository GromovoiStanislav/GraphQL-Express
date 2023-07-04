import express from "express";
import {createHandler} from 'graphql-http/lib/use/express';

import {schema} from "./schema/index.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to my api");
});

app.all('/graphql', createHandler({schema}));


export default app;
