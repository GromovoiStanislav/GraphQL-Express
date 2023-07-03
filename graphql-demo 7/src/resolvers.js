// Local Data
import {tasks} from "./sample.js";

// Mongoose Model
import User from "./models/user.js";

export const resolvers = {
    Query: {
        hello(root, args, context, info) {
            console.log(context)
            return 'Hello GraphQL';
        },
        greet(root, {name}, context, info) {
            console.log(context)
            return `Hello ${name}`;
        },
        Tasks(root, args, context, info) {
            console.log(context)
            return tasks;
        },
        async Users() {
            return User.find();
        },
        async getUser(_, {_id}) {
            return User.findById(_id);
        }
    },
    Mutation: {
        createTask(_, {input}) {
            input._id = tasks.length;
            tasks.push(input);
            return input;
        },
        async createUser(_, {input}) {
            return User.create(input);
        },
        async updateUser(_, {_id, input}) {
            return User.findByIdAndUpdate(_id, input, {new: true});
        },
        async deleteUser(_, {_id}) {
            return User.findByIdAndDelete(_id);
        }
    }
};