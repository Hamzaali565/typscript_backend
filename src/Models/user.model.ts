import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUser extends Document {
  u_name: string;
  u_id: string;
  password: string;
  isAccessToken(): Promise<string>;
  isPassMatch(password: String): Promise<Boolean>;
}

interface IUserModel extends Model<IUser> {
  isUserCheck(u_id: string): Promise<IUser | null>;
}

const userSchema = new Schema<IUser>({
  u_name: { type: String, required: true },
  u_id: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre<IUser>("save", async function (next): Promise<void> {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.statics.isUserCheck = async function (
  u_id: string
): Promise<IUser | null> {
  return await this.findOne({ u_id });
};

userSchema.methods.isPassMatch = async function (
  password: string
): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.isAccessToken = async function (): Promise<string> {
  return jwt.sign(
    {
      u_id: this.u_id,
      u_name: this.u_name,
    },
    "topSecret",
    { expiresIn: "2d" }
  );
};

const userModel = model<IUser, IUserModel>("user", userSchema);

export { userModel };
