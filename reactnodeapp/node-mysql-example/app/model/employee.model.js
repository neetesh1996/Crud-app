module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    EmployeeName: {
      type: Sequelize.STRING
    },
    EmployeeEmail: {
      type: Sequelize.STRING
    },
    EmployeePhone: {
      type: Sequelize.STRING,
      unique: true
    },
    EmployeeCity: {
      type: Sequelize.STRING
    }
  });

  return Employee;
};
