const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    passwrod: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "listener"},
    name: {type: DataTypes.STRING}
});

const Room = sequelize.define('room',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.INTEGER},
    name: {type: DataTypes.STRING}
});

const Widget =  sequelize.define('widget',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    room_id: {type: DataTypes.INTEGER},
    type: {type: DataTypes.STRING},
    top: {type: DataTypes.STRING},
    left: {type: DataTypes.STRING},
});

// User.hasOne(Room);
// Room.belongsTo(User);

// Room.hasMany(Widget);
// Widget.belongsTo(Room);

module.exports = {User, Room, Widget}