import mongoose, { model, Schema } from "mongoose";
import { PasswordHasher } from "../../Utils/Helper";

export type userType = {
  _id: mongoose.Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  todos: mongoose.Types.ObjectId[];  // Change from string[] to ObjectId[]
};

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: { type: String, required: true },
    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await PasswordHasher(this.password);
  }
  next();
});

const UserModel = model<userType>("user", userSchema);

export default UserModel;
