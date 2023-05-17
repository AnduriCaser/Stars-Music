const { Model,Sequelize } = require("sequelize");

const { v4: uuidv4 } = require("uuid");


module.exports = async (sequelize, DataTypes) => {
    class Playlist extends Model {
        toJSON() {
            const attributes = { ...this.get() };

            return attributes;
        };
        static async associate(models) {
            //(await models.Playlist).hasMany((await models.Song), { foreignKey: 'playlistId' });
            //(await models.Playlist).belongsTo((await models.User), { foreignKey: 'userId' });
        };
    };

    Playlist.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
       /*  userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }, */
    /*     songs:{
            type: Sequelize.ARRAY(Sequelize.TEXT),
            defaultValue: [],
        }, */
        /* songs: {
            type: Sequelize.STRING,
            defaultValue: ';',
            get() {
                const data = this.getDataValue('songs') ? this.getDataValue('songs').split(';') : [];
                return data
            },
            set(val) {
                console.log(val);
                const data = this.getDataValue('songs') ? this.getDataValue('songs').split(';') : [];
                console.log(data);
                
               this.setDataValue('songs',val.join(';'));
            },
        }, */
        songs: DataTypes.STRING,
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        duration: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Playlist',
        tableName: 'playlists'
    }
    );

    //await Playlist.sync();
    await Playlist.sync().then(() => {
        console.log('Tables created');
      }).catch(err => {
        console.error('Unable to create tables', err);
      });
    return Playlist;
};