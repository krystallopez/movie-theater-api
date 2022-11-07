const { Show } = require("./Show");
const { User } = require("./User");

Show.belongsTo(User); //{foreignKey: 'UserId'}
User.hasMany(Show); //{foreignKey: 'ShowId'}

module.exports = { Show, User };
