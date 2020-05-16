const express = require('express');

const PlaylistCtrl = require('../controllers/playlist-ctrl');

const router = express.Router();

router.post('/playlist', PlaylistCtrl.createPlaylist);
router.put('/playlist/:id', PlaylistCtrl.updatePlaylist);
router.delete('/playlist/:id', PlaylistCtrl.deletePlaylist);
router.get('/playlist/:id', PlaylistCtrl.getPlaylistById);
router.get('/playlists', PlaylistCtrl.getPlaylists);

module.exports = router;