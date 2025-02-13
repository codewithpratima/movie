import { Schema, model, models } from "mongoose";

const VideoSchema = new Schema({
  movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  videoUrl: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

export const Video = models.Video || model("Video", VideoSchema);
