const express = require("express");
const AuthController = require("../controllers/AuthController");
const { isAuthenticated } = require("../middlewares/Auth");


const router = express.Router();


router.get('/:slug', AuthController.register);

module.exports = router;