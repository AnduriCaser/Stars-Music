const express = require("express");
const AuthController = require("../controllers/AuthController");
const { isAuthenticated } = require("../middlewares/Auth");


const router = express.Router();


router.get('/register', AuthController.register);
router.get('/login', AuthController.login);
router.get('/resetPassword', AuthController.resetPassword);
router.get('/changePassword/:uuid', AuthController.changePassword);

router.get('/logout', isAuthenticated, AuthController.logout);



router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/resetPassword', AuthController.resetPassword);
router.post('/changePassword/:uuid', AuthController.changePassword);


module.exports = router;