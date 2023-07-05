import "dotenv/config"
import express from 'express';
import {createHandler} from 'graphql-http/lib/use/express';
import {schema} from './graphql/schema.js';
import {connectDB} from "./db/index.js";


await connectDB();

const app = express();

app.get("/", (req, res) => res.json({msg: "Welcome. Go to /graphql"}));


app.all('/graphql', createHandler({
    schema,
    context: (req) => ({token: req.headers.authorization}),
}))


const PORT = process.env.PORT || 3000
await app.listen(PORT)
console.log(`Express ready at http://localhost:${PORT}`);
console.log(`Graphql ready at http://localhost:${PORT}/graphql`);
