import { Fish } from "../models/fish.js";
import {v2 as cloudinary} from 'cloudinary'

async function create (req, res) {
  req.body.owner = req.user.profile
  Fish.create(req.body)
  .then(fish => {
    Fish.findById(fish._id)
    .populate('owner')
    .then(populatedFish => {
      res.json(populatedFish)
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({err: err.errmsg})
  })
}

function index (req, res) {
  Fish.find({})
  .populate('owner')
  .then(fishes => {
    res.json(fishes)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err: err.errmsg})
  })
}

function deleteOne(req, res) {
  Fish.findById(req.params.id)
  .then(fish => {
    if (fish.owner._id.equals(req.user.profile)){
      Fish.findByIdAndDelete(fish._id)
      .then(deletedFish => {
        res.json(deletedFish)
      })
    } else {
      res.status(401).json({err: "Not authorized"})
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({err: err.errmsg})
  })
}

function update(req, res) {
  Fish.findById(req.params.id)
  .then(fish => {
    if (fish.owner._id.equals(req.user.profile)) {
      Fish.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate('owner')
      .then(updatedFish => {
        res.json(updatedFish)
      })
    } else {
      res.status(401).json({err: "Not authorized"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Fish.findById(req.params.id)
  .then(fish => {
    cloudinary.uploader.upload(imageFile, {tags: `${fish.name}`})
    .then(image => {
      fish.photo = image.url
      fish.save()
      .then(fish => {
        res.status(201).json(fish.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

export {
  create,
  index,
  deleteOne as delete,
  update,
  addPhoto,
}