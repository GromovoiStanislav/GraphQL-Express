import { GraphQLNonNull, GraphQLString } from "graphql";
export const GREETING = {
    type: GraphQLString,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(_, args) {
        return `Hello ${args.name}`;
    },
};
