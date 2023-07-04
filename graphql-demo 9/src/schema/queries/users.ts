import {GraphQLID, GraphQLList, GraphQLNonNull,} from "graphql";
import {User} from "../../entity/User.js";
import {UserType} from "../TypeDefs/user.js";


export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    resolve() {
        return User.find();
    },
};


export const GET_USER = {
    type: UserType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
    },
    async resolve(_: any, args: any) {
        return User.findOneBy({id: args.id});
    },
};
