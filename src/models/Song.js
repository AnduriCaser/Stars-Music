const { Model } = require("sequelize");

const { v4: uuidv4 } = require("uuid");


module.exports = async (sequelize, DataTypes) => {
    class Song extends Model {
        toJSON() {
            const attributes = { ...this.get() };

            return attributes;
        };
        static async associate(models) {
            (await models.Song).belongsTo((await models.Album), { foreignKey: 'albumId' });
            (await models.Song).belongsTo((await models.Artist), { foreignKey: 'artistId' });
            (await models.Song).belongsTo((await models.Playlist), { foreignKey: 'playlistId' });
        };
    };

    Song.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        albumId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'albums',
                key: 'id'
            }
        },
        artistId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'artists',
                key: 'id'
            }
        },
        playlistId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'playlists',
                key: 'id'
            }
        },
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        duration: DataTypes.STRING,
        slug: {
            type: DataTypes.STRING,
            unique: {
                args: false
            }
        }
    }, {
        sequelize,
        modelName: 'Song',
        tableName: 'songs'
    }
    );
    
    await Song.sync();

    return Song;
};