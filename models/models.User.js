import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    favoriteFood: {
      type: [String],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

const Person = model("User", userSchema);
export default Person;
