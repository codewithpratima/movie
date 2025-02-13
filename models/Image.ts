import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({
  movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  imageUrl: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

export const Image = models.Image || model("Image", ImageSchema);
