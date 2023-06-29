import { Fish } from "../models/fish.js";

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

export {
  create,
  index,
  deleteOne as delete,
  update,
}