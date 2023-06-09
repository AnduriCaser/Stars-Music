const express = require("express");
const UserController = require("../controllers/UserController");
const { isAuthenticated } = require("../middlewares/Auth");


const router = express.Router();


router.get('/:slug', UserController.dashboard);


module.exports = router;