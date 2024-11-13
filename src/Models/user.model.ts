import { Schema, model } from "mongoose";

interface IUser extends Document {
  name: string;
  u_id: string;
  password: string;
}

const user = new Schema<IUser>({
  name: { type: String, required: true },
  u_id: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = model<IUser>("user", user);

export { userModel };
