const { Model } = require("sequelize");

const { v4: uuidv4 } = require("uuid");


module.exports = async (sequelize, DataTypes) => {
    class Album extends Model {
        toJSON() {
            const attributes = { ...this.get() };

            return attributes;
        };
        static async associate(models) {
            //(await models.Album).hasMany((await models.Song), { foreignKey: 'albumId' });
            (await models.Album).belongsTo((await models.Artist), { foreignKey: 'artistId' });
        };
    };

    Album.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        artistId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'artists',
                key: 'id'
            }
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        releaseDate: DataTypes.DATE,
        slug: {
            type: DataTypes.STRING,
            unique: {
                args: false
            }
        }
    }, {
        sequelize,
        modelName: 'Album',
        tableName: 'albums'
    }
    );

    await Album.sync();

    return Album;
};