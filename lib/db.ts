import mongoose, { Connection, ConnectOptions } from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable in .env.local"
  );
}

// Extend Node.js global object to store the cached connection
interface MongooseGlobal {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Use global cache to prevent multiple connections
declare global {
  var mongooseGlobal: MongooseGlobal | undefined;
}

let cached: MongooseGlobal = global.mongooseGlobal || {
  conn: null,
  promise: null,
};

if (!global.mongooseGlobal) {
  global.mongooseGlobal = cached;
}

async function dbConnect(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: ConnectOptions = { bufferCommands: false };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected successfully");
        return mongooseInstance.connection; // Extract the connection instance
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
