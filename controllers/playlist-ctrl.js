const Playlist = require('../models/playlist-model');

createPlaylist = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a playlist',
        });
    }

    const playlist = new Playlist(body);

    if (!playlist) {
        return res.status(400).json({ success: false, error: err });
    }

    playlist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: playlist._id,
                message: 'Playlist created !',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist not created !',
            });
        })
}

updatePlaylist = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found !',
            });
        }
        playlist.name = body.name;
        playlist.category = body.category;
        playlist.cover = body.cover;
        playlist.url = body.url;
        playlist
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: playlist._id,
                    message: 'Playlist updated !',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Playlist not updated !',
                });
            })
    })
}

deletePlaylist = async (req, res) => {
    await Playlist.findOneAndDelete({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!playlist) {
            return res
                .status(404)
                .json({ success: false, error: `Playlist not found` });
        }

        return res.status(200).json({ success: true, data: playlist });
    }).catch(err => console.log(err))
}

getPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!playlist) {
            return res
                .status(404)
                .json({ success: false, error: `Playlist not found` });
        }
        return res.status(200).json({ success: true, data: playlist });
    }).catch(err => console.log(err))
}

getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlist not found` });
        }
        return res.status(200).json({ success: true, data: playlists });
    }).catch(err => console.log(err))
}

module.exports = {
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    getPlaylists,
    getPlaylistById,
}