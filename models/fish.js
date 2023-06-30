import mongoose from "mongoose";

const Schema = mongoose.Schema

const fishSchema = new Schema({
  type: {type: String, required: true},
  weight: {type: Number, required: true},
  reel: {type: String, required: true},
  bait: {type: String, required:true},
  owner: {type: mongoose.Schema.Types.ObjectId, ref:"Profile"},
  photo: {type: String},
  date: {
    type: Date, 
    required: true, 
    default: function() {
    return new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  }},
}, {
  timestamps: true
})

const Fish = mongoose.model('Fish', fishSchema)

export {
  Fish
}