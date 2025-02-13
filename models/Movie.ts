import { Schema, model, models } from "mongoose";

const MovieSchema = new Schema({
  name: { type: String, required: true },
  singer: { type: [String], required: true }, // Use 'singer' here instead of 'singerName'
  cast: { type: [String], required: true },
  releaseDate: { type: Date, required: true },
  budget: { type: Number, required: true },
});

export const Movie = models.Movie || model("Movie", MovieSchema);
