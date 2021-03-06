'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		userName: DataTypes.STRING,
		password: DataTypes.STRING,
		realName: DataTypes.STRING,
		email: DataTypes.STRING
	}, {});
	User.associate = function(models) {
		// associations can be defined here
	};
	return User;
};