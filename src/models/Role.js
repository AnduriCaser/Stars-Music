const { Model } = require("sequelize");


module.exports = async (sequelize, DataTypes) => {
    class Role extends Model {
        static async associate(models) {
            (await models.Role).hasOne((await models.User), { foreignKey: 'roleId' })
        }
    };
    Role.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Role already exists'
            }
        }
    }, {
        sequelize,
        modelName: 'Role',
        tableName: 'roles'
    });

    await Role.sync();

    return Role;
};