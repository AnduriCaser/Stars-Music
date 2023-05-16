const { Model } = require("sequelize");

const { v4: uuidv4 } = require("uuid");


module.exports = async (sequelize, DataTypes) => {
    class User extends Model {
        toJSON() {
            const attributes = { ...this.get() };

            return attributes;
        };
        static async associate(models) {
            (await models.User).belongsTo((await models.Role), { foreignKey: 'roleId' });
            (await models.User).hasMany((await models.Product), { foreignKey: 'userId' });
            (await models.User).hasMany((await models.File), { foreignKey: 'userId' });
        };
    };

    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        roleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'roles',
                key: 'id'
            }
        },
        username: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter your email'
            },
            unique: {
                args: true,
                msg: 'Email already exists'
            }
        },
        phoneNumber: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter your password'
            }
        },
        resetToken: {
            type: DataTypes.STRING,
            unique: {
                args: false
            }
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users'
    }
    );

    // User.prototype.getRole = async (roleId) => {
    //     const role = await (await Role).findOne({ where: { id: roleId } });
    //     return role;
    // };
    User.prototype.generateToken = async (email) => {
        const token = uuidv4();
        const user = await User.findOne({ where: { email: email } });
        user.resetToken = token;
        user.save();
    }
    User.prototype.getResetToken = async (userId) => {
        const user = await User.findOne({ where: { id: userId } });
        return user.resetToken;
    };

    await User.sync();

    return User;
};