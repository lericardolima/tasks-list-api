"use strict";
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM({
          values: ["pending", "ongoing", "completed"]
        }),
        defaultValue: "pending"
      }
    },
    {}
  );
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};
