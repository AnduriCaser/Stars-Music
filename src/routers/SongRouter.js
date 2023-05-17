const express = require("express");
const { isAuthenticated } = require("../middlewares/Auth");
const songController = require("../controllers/songControllerNew");


const router = express.Router();

router.get('/stream/:id',songController.streamMusic);
router.post('/',songController.createMusic);
router.get('/byId/:id',songController.getMusicById);
router.post('/search',songController.searchMusic);
router.get('/all',songController.getAllMusic);


module.exports = router;