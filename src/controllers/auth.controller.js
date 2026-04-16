const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");
const partnerModel = require("../models/partner.model");


// User controllers

async function handleRegister(req, res) {
    const {
        fullName,
        email,
        password
    } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }

    const alreadyExist = await userModel.findOne({
        email
    });
    if (alreadyExist) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const hashedPassword = await bycrypt.hash(password, 10);

    const newUser = userModel.create({
        fullName,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({
        id: newUser._id,
        fullName,
        email
    }, process.env.JWT_SECRET)

    res.cookie('token', token);
    res.status(201).json({
        message: "User registered successfully",
        fullName,
        email
    });
}

async function handleLogin(req, res) {
    const {
        email,
        password
    } = req.body;


    if (!email || !password) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }

    const user = await userModel.findOne({
        email
    });

    if (!user) {
        return res.status(400).json({
            message: "Wrong email or password"
        });
    }

    const isPasswordCorrect = await bycrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Wrong email or password"
        });
    }

    const token = jwt.sign({
        id: user._id,
        email
    }, process.env.JWT_SECRET);

    res.cookie('token', token);

    return res.status(200).json({
        message: "User logged-in",
        email
    });
}

async function handleLogout(req, res) {
    res.clearCookie('token');

    res.status(200).json({ message: "Logged out" })
}

//Partner controllers

async function handlePartnerRegister(req, res) {
    const {
        fullName,
        email,
        password
    } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }

    const alreadyExist = await partnerModel.findOne({
        email
    });
    if (alreadyExist) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const hashedPassword = await bycrypt.hash(password, 10);

    const newUser = partnerModel.create({
        fullName,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({
        id: newUser._id,
        fullName,
        email
    }, process.env.JWT_SECRET)

    res.cookie('token', token);
    res.status(201).json({
        message: "User registered successfully",
        fullName,
        email
    });
}

async function handlePartnerLogin(req, res) {
    const {
        email,
        password
    } = req.body;


    if (!email || !password) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }

    const user = await partnerModel.findOne({
        email
    });

    if (!user) {
        return res.status(400).json({
            message: "Wrong email or password"
        });
    }

    const isPasswordCorrect = await bycrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Wrong email or password"
        });
    }

    const token = jwt.sign({
        id: user._id,
        email
    }, process.env.JWT_SECRET);

    res.cookie('token', token);

    return res.status(200).json({
        message: "User logged-in",
        email
    });
}

module.exports = {
    handleRegister,
    handleLogin,
    handlePartnerRegister,
    handlePartnerLogin,
    handleLogout
}