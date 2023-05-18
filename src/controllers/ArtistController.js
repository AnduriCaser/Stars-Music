const model = require("../models");


const { hashPassword, hashCompare } = require("../utils/CustomHash");
const { customErrorResponse } = require("../utils/CustomResponse");

module.exports = {
    async getAllArtists(req, res) {
        
    },
    async getArtistById(req, res) {
      
    },
    async createArtist(req, res) {
     
    },

    async updateArtist(req, res) {
        const { User } = await model;

        if (req.method === 'GET') {
            if (req.params || req.params !== undefined) {
                const { uuid } = req.params;
                if (((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            return res.render('auth/changePassword', {
                                uuid
                            });
                        };
                        throw new Error("User not found !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "Something went wrong !");
                }
            }
        } else if (req.method === 'POST') {
            if ((req.params || req.params !== undefined) && (req.body || req.body !== undefined)) {
                const { uuid } = req.params;
                const { password } = req.body;
                if (((password || password !== undefined) && (typeof password === 'string')) && ((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            user.password = hashPassword(password);
                            user.save();
                            return res.redirect('/auth/login');
                        };
                        throw new Error("User doesn't exists !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "UUID or password empty !");
                }
            }
        } else {
            return customErrorResponse(res, 405, "Method not allowed");
        }
    },

    async deleteArtist(req, res) {
       
    },
    async getArtistAlbums(req, res) {
    
    },
    async getArtistSongs(req, res) {
   
    },
    async getTopArtists(req, res) {
      
    },
    async getArtistPopularSongs(req, res) {
      
    },
    async searchArtists(req, res) {
     
    }
}
