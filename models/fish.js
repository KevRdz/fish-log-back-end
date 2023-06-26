import mongoose from "mongoose";

const Schema = mongoose.Schema

const fishSchema = new Schema({
  type: {type: String, required: true},
  weight: {type: Number, required: true},
  reel: {type: String, required: true},
  bait: {type: String, required:true},
  owner: {type: mongoose.Schema.Types.ObjectId, ref:"Profile"},
}, {
  timestamps: true
})

const Fish = mongoose.model('Fish', fishSchema)

export {
  Fish
}