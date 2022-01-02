import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost/graphql", {
      useNewUrlParser: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
};
