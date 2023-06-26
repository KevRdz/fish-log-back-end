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

export {
  create,
  index,
}