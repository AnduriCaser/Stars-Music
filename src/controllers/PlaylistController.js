const model = require("../models");


const { hashPassword, hashCompare } = require("../utils/CustomHash");
const { customErrorResponse } = require("../utils/CustomResponse");

module.exports = {
    async getAllPlaylists(req, res) {
     
    },
    async getPlaylistById(req, res) {
       
    },
    async createPlaylist(req, res) {
    
    },

    async deletePlaylist(req, res) {
      
    },
    async updatePlaylist(req, res) {
        
    },
    async getPlaylistSongs(req, res) {
      
    },

    async addSongToPlaylist(req, res) {
      
    },

    async removeSongFromPlaylist(req, res) {
       
    },

    async getAlbumByArtist(req, res) {
      
    },

    async searchPlaylists(req, res) {
    
    },

    async deleteAlbum(req, res) {
    
    },

    async getPlaylistDuration(req, res) {
      
    },
    async likePlaylist(req, res) {

    },
    async unlikePlaylist(req, res) {
       
    },
}
