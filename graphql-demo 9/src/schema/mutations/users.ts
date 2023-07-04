import {GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString,} from "graphql";
import {User} from "../../entity/User.js";
import {comparePassword, hashPassword} from "../../libs/bcrypt.js";
import {MessageType} from "../TypeDefs/message.js";
import {UserType} from "../TypeDefs/user.js";


export const CREATE_USER = {
    type: UserType,
    args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        username: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)},
    },
    async resolve(parent: any, args: any) {
        const {name, username, password} = args;

        const encryptPassword = await hashPassword(password);

        const result = await User.insert({
            name,
            username,
            password: encryptPassword,
        });

        return {...args, id: result.identifiers[0].id, password: encryptPassword};
    },
};


export const DELETE_USER = {
    //type: GraphQLBoolean,
    type: MessageType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
    },
    async resolve(_: any, {id}: any) {
        const result = await User.delete({id});
        if (result.affected! > 0) {
            //return true;
            return {
                success: true,
                message: "User deleted",
            };
        }
        //return false;
        return {
            success: false,
            message: "User not found"
        };
    },
};


export const UPDATE_USER = {
    type: MessageType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        input: {
            type: new GraphQLInputObjectType({
                name: "UserInput",
                fields: () => ({
                    name: {type: GraphQLString},
                    username: {type: GraphQLString},
                }),
            }),
        },
    },
    async resolve(_: any, {id, input}: any) {
        const userFound = await User.findOneBy({id});
        if (!userFound) {
            throw new Error("User not found");
        }

        const response = await User.update({id}, input);

        if (response.affected === 0) {
            return {
                success: false,
                message: "User not found"
            };
        }

        return {
            success: true,
            message: "Update User successfully",
        };
    },
};


export const UPDATE_USER_PASSWORD = {
    type: MessageType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        input: {
            type: new GraphQLInputObjectType({
                name: "UserPasswordInput",
                fields: () => ({
                    oldPassword: {type: new GraphQLNonNull(GraphQLString)},
                    newPassword: {type: new GraphQLNonNull(GraphQLString)},
                }),
            }),
        },
    },
    async resolve(_: any, {id, input}: any) {
        const userFound = await User.findOneBy({id});
        if (!userFound) {
            throw new Error("User not found");
        }

        // Compare old password with the new password
        const isMatch = await comparePassword(
            userFound?.password as string,
            input.oldPassword
        );
        if (!isMatch) {
            throw new Error("Passwords does not match");
        }

        // Hashing the password and deleting oldPassword and new Password
        const newPassword = await hashPassword(input.newPassword);
        delete input.oldPassword;
        delete input.newPassword;

        // Adding password to the input for update
        input.password = newPassword;

        const response = await User.update({id}, input);

        if (response.affected === 0) {
            return {
                success: false,
                message: "User not found"
            };
        }

        return {
            success: true,
            message: "Update password successfully",
        };
    },
};
