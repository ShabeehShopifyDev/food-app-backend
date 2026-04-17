const jwt = require("jsonwebtoken");
const partnerModel = require("../models/partner.model");
const userModeel = require("../models/user.model");

async function partnerAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const partner = await partnerModel.findById(decoded.id);

    req.partner = partner;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

async function userAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await userModeel.findById(decoded.id);

    if (user) {
      req.user = user;
    } else {
      user = await partnerModel.findById(decoded.id);
      if (user) {
        req.user = user;
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = {
  partnerAuth,
  userAuth
};