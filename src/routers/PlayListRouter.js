const express = require("express");
const playListController = require("../controllers/PlaylistControllerNew");


const router = express.Router();

router.get('/',playListController.getPlaylists);
router.post('/',playListController.createPlaylist);
router.post('/:id',playListController.addSongToPlaylist);
router.get('/:id',playListController.getPlaylist);

module.exports = router;