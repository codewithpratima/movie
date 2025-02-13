import mongoose, { Document, Schema } from "mongoose";

// Define the User interface with password field
export interface IUser extends Document {
  name: string;
  email: string;
  password: string; // Added password field
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Added password field
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
