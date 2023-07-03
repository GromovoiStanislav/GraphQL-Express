import express from 'express';
import {createHandler} from 'graphql-http/lib/use/express';
import {connectDB} from "./database.js";
import schema from "./schema.js";

const app = express();
await connectDB();


app.all('/graphql', createHandler({
    schema,
    context: {
        messageId: 1
    }
}));

await app.listen({port: 3000});
console.log('Listening to port 3000');