'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: DataTypes.STRING,
    courseId: DataTypes.INTEGER
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsTo(sequelize.models.Course)
  };
  Student.beforeCreate(student => {
    student.name = student.name.toUpperCase()
    return student
  })
  return Student;
};