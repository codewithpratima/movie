// types/session.ts

// Define the User interface based on your existing mongoose model
import { IUser } from "../models/User"; // Adjust the path as needed

export interface Session {
  user: IUser; // The user in the session
  exp: number; // The JWT expiration timestamp (if you're using JWT)
}
