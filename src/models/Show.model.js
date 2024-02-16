import { Schema, model, models } from "mongoose";

const ShowSchema = new Schema({
  id: {
    type: number,
    unique: true,
    required: true,
  },
  episodes: {
    type: number,
    unique: true,
    required: true,
  },
  episodes_aired: {
    type: number,
    required: true,
  },
  aired_on: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: string,
    unique: true,
    required: true,
  },
});

const Show = models?.Show || model("Show", ShowSchema);

export default Show;
