import { tasks } from "./sample.js";
import User from "./modelsMongo/User.js";
export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    greet(root, args, context) {
      return `Hello ${args.name}`;
    },
    tasks: () => tasks,
    async users() {
      return await User.find();
    },
  },
  Mutation: {
    createTask(root, args, context) {
      const task = {
        _id: tasks.length + 1,
        title: args.input.title,
        description: args.input.description,
        number: args.input.number,
      };
      tasks.push(task);
      return task;
    },
    async createUser(root, args, context) {
      const user = new User({
        firstname: args.input.firstname,
        lastname: args.input.lastname,
        age: args.input.age,
      });
      await user.save();
      return user;
    },
    async deleteUser(_, { _id }) {
      const user = User.findById(_id);
      await user.remove();
      return user;
    },
    async updateUser(_, { _id, input }) {
      return await User.findByIdAndUpdate(_id, input, { new: true });
    },
  },
};
