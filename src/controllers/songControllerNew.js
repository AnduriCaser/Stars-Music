const model = require("../models");
const fs = require("fs");
const { Op } = require("sequelize");

async function streamMusic (req, res) {
    try {
        const { id } = req.params;
    const { Song } = await model;
    const existsSong = await (await Song).findOne({ where: { id } });
    if (!existsSong) {
        return res.status(404).send("Song not found");
    }
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const musicPath = existsSong.path
    const musicSize = fs.statSync(musicPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, musicSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${musicSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "audio/mpeg3",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(musicPath, { start, end });
    videoStream.pipe(res);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
async function createMusic (req, res) {
   try {
     const { name, path } = req.body;
    console.log(req.body);
    const { Song } = await model;

    const existsSong = await (await Song).findOne({ where: { name: name } });
        if (!existsSong) {
            const createSong = await (await Song).create({ name, path });
            return res.json(createSong);
        }
    return res.json({ message: "Song already exists" });
   } catch (error) {
         console.log(error);
            return res.status(500).json({ message: error });
   }
};
async function getMusicById (req, res) {
    try {
        const { id } = req.params;
        const { Song } = await model;

 
     const existsSong = await (await Song).findOne({ where: { id } });
         if (!existsSong) {
                return res.json({ message: "Song not found" });
         }
     return res.json(existsSong);
    } catch (error) {
          console.log(error);
             return res.status(500).json({ message: error });
    }
 };
 async function searchMusic (req, res) {
    try {
        const { query } = req.body;
        const { Song } = await model;

 
     const existsSong = await (await Song).findAll({ where: { name: {
        [Op.like]: '%' + query + '%'
    }  } });
         if (!existsSong) {
                return res.json({ message: "Song not found" });
         }
     return res.json(existsSong);
    } catch (error) {
          console.log(error);
             return res.status(500).json({ message: error });
    }
 };
 async function getAllMusic (req, res) {
    try {
        const { Song } = await model;

 
     const existsSong = await (await Song).findAll({});
         if (!existsSong) {
                return res.json({ message: "Song not found2" });
         }
     return res.json(existsSong);
    } catch (error) {
          console.log(error);
             return res.status(500).json({ message: error });
    }
 };

module.exports = { streamMusic,createMusic,getMusicById,searchMusic,getAllMusic };