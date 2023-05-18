const model = require("../models");

const { customErrorResponse } = require("../utils/CustomResponse");

module.exports = {
    async dashboard(req, res) {
      return res.render("user/dashboard");
    },
    async profile(req, res) {
        // Burayı doldur
    },
    async deleteAccount(req, res) {
      
    },

    async getUserLikedSongs(req, res) {
       
    },

    async getUserPlaylists(req, res) {

    }
}
