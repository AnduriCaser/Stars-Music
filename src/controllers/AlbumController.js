const model = require("../models");


const { hashPassword, hashCompare } = require("../utils/CustomHash");
const { customErrorResponse } = require("../utils/CustomResponse");

module.exports = {
    async getAllAlbums(req, res) {
     
    },
    async getAlbumById(req, res) {
      
    },
    async createAlbum(req, res) {
        const { User } = await model;

        if (req.method === 'GET') {
            return res.render('auth/resetPassword');
        } else if (req.method === 'POST') {
            if (req.body || req.body !== undefined) {
                const { email } = req.body;
                if (((email || email !== undefined) && (typeof email === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { email: email } });
                        if (user) {
                            await user.generateToken(user.email);
                            return res.redirect('/auth/login');
                        }
                        throw new Error("User doesn't exists !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "Something went wrong !");
                }
            } else {
                return customErrorResponse(res, 405, "Body is empty");
            }
        } else {
            return customErrorResponse(res, 405, "Method not allowed");
        }
    },

    async updateAlbum(req, res) {
     
    },

    async deleteAlbum(req, res) {
      
    },
    async getAlbumSongs(req, res) {

    },

    async addSongToAlbum(req, res) {
    
    },

    async removeSongFromAlbum(req, res) {
       
    },

    async getAlbumByArtist(req, res) {
    
    },

    async getTopAlbums(req, res) {
      
    },

    async searchAlbums(req, res) {
     
    },

    async deleteAlbum(req, res) {
      
    },

    async getAlbumDuration(req, res) {
        
    },
    async getAlbumArtists(req, res) {
       
    }
}
