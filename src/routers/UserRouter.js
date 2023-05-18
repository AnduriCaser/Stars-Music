const express = require("express");
const UserController = require("../controllers/UserController");
const { isAuthenticated } = require("../middlewares/Auth");


const router = express.Router();


router.get('/dashboard', UserController.dashboard);
router.get('/profile', UserController.profile);




router.post('/profile', UserController.profile);

module.exports = router;