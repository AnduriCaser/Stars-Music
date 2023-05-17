const { Model } = require("sequelize");

const { v4: uuidv4 } = require("uuid");


module.exports = async (sequelize, DataTypes) => {
    class Artist extends Model {
        toJSON() {
            const attributes = { ...this.get() };

            return attributes;
        };
        static async associate(models) {
            (await models.Artist).hasMany((await models.Song), { foreignKey: 'artistId' });
            (await models.Artist).hasMany((await models.Album), { foreignKey: 'artistId' });
        };
    };

    Artist.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        bio: DataTypes.STRING,
        image: DataTypes.STRING,
        slug: {
            type: DataTypes.STRING,
            unique: {
                args: false
            }
        }
    }, {
        sequelize,
        modelName: 'Artist',
        tableName: 'artists'
    }
    );

    await Artist.sync();

    return Artist;
};