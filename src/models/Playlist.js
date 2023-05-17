const { Model } = require("sequelize");

const { v4: uuidv4 } = require("uuid");


module.exports = async (sequelize, DataTypes) => {
    class Playlist extends Model {
        toJSON() {
            const attributes = { ...this.get() };

            return attributes;
        };
        static async associate(models) {
            (await models.Playlist).hasMany((await models.Song), { foreignKey: 'playlistId' });
            (await models.Playlist).belongsTo((await models.User), { foreignKey: 'userId' });
        };
    };

    Playlist.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
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
        modelName: 'Playlist',
        tableName: 'playlists'
    }
    );

    await Playlist.sync();

    return Playlist;
};