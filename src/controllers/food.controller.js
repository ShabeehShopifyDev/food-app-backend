const foodModel = require("../models/food.model");
const uploadVideo = require("../services/cloud.service");


async function handleAddFood(req, res) {
  const { name, description } = req.body;

  const uploadResponse = await uploadVideo(req.file.buffer, req.file.originalname);
  const videoUrl = uploadResponse.url;
  
  if (!name) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const food = await foodModel.create({
    name,
    description,
    videoUrl,
    foodPartner: req.partner._id
  })

  return res.status(201).json({ message: "Food item added succeffuly", food });
}

async function handleGetFoods(req, res) {
  const foods = await foodModel.find({});
  return res.status(200).json({ message: "Posts found successfylly", foods });
}

module.exports = {
  handleAddFood,
  handleGetFoods
};