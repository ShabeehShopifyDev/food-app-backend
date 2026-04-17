const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const foodControllers = require("../controllers/food.controller");
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});

router.post("/add", auth.partnerAuth, upload.single("video"), foodControllers.handleAddFood);
router.get("/", auth.userAuth, foodControllers.handleGetFoods);


module.exports = router;