import express from "express";
import http from 'node:http';
import cors from 'cors';

import {ApolloServer} from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";

import {resolvers, typeDefs} from "./graphql/index.js";



const app = express();
const httpServer = http.createServer(app);

const server  = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }),
);

await httpServer.listen(3000 );
console.log(`Server ready at http://localhost:3000/graphql`);


