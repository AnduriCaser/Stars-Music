const model = require("../models");
const fs = require("fs");

async function createPlaylist (req, res) {
   try {
    const { name } = req.body;
    console.log(req.body);
    const { Playlist } = await model;

    const existsPlaylist = await (await Playlist).findOne({ where: { name: name } });
        if (!existsPlaylist) {
            const createPlaylist = await (await Playlist).create({ name });
            return res.json(createPlaylist);
        }
    return res.json({ message: "Playlist already exists" });
   } catch (error) {
         console.log(error);
            return res.status(500).json({ message: error });
   }
};
async function getPlaylists (req, res) {
    try {
     const { Playlist } = await model;
 
     const existsPlaylist = await (await Playlist).findAll({});
         if (!existsPlaylist) {
            return res.json({ message: "Playlist not found" });
         }
    for(let i=0;i<existsPlaylist.length;i++){
        existsPlaylist[i].songs = existsPlaylist[i].songs.split(';');
        existsPlaylist[i].songs.shift();
        existsPlaylist[i].songs=existsPlaylist[i].songs;


    }
     return res.json(existsPlaylist);
    } catch (error) {
          console.log(error);
             return res.status(500).json({ message: error });
    }
 };
async function getPlaylist (req, res) {
    try {
        const { id } = req.params;
        const { Playlist } = await model;
    
        const existsPlaylist = await (await Playlist).findOne({where: { id }});
            if (!existsPlaylist) {
                return res.json({ message: "Playlist not found" });
            }
        existsPlaylist.songs = existsPlaylist.songs.split(';');
        return res.json(existsPlaylist);
        } catch (error) {
                console.log(error);
                return res.status(500).json({ message: error });
        }
 };
 async function addSongToPlaylist (req, res) {
    try {
        const { songId } = req.body;
        const { id } = req.params;
        const { Playlist } = await model;
        const { Song } = await model;

    
        const existsPlaylist = await (await Playlist).findOne({where: { id }});
            if (!existsPlaylist) {
                return res.json({ message: "Playlist not found" });
            }
        const existsSong = await (await Song).findOne({ where: { id:songId } });
        if (!existsSong) {
            return res.status(404).send("Song not found");
        }
        const songs =existsPlaylist.songs ? existsPlaylist.songs : '';
        existsPlaylist.songs = songs+';'+songId;
        existsPlaylist.save();
        return res.json({ status: true });
        } catch (error) {
                console.log(error);
                return res.json({ status: false });
                //return res.status(500).json({ message: error });
        }
 };

module.exports = { createPlaylist,getPlaylists,getPlaylist,addSongToPlaylist };