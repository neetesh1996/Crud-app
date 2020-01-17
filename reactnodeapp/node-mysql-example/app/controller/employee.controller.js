const db = require("../config/db.config.js");
const Employee = db.employees;

// Post a employee
exports.create = (req, res) => {
  // Save to MySQL database
  Employee.create({
    EmployeeName: req.body.EmployeeName,
    EmployeeEmail: req.body.EmployeeEmail,
    EmployeePhone: req.body.EmployeePhone,
    EmployeeCity: req.body.EmployeeCity
  }).then(employee => {
    // Send created employee to client
    res.json(employee);
  });
};

// FETCH all employee
exports.findAll = (req, res) => {
  Employee.findAll().then(employees => {
    // Send all employee to Client
    res.json(employees);
  });
};

// Find a employee by Id
exports.findByPk = (req, res) => {
  Employee.findByPk(req.params.id).then(employee => {
    res.json(employee);
  });
};

// Update a employee
exports.update = (req, res) => {
  const id = req.params.id;
  Employee.update(
    {
      EmployeeName: req.body.EmployeeName,
      EmployeeEmail: req.body.EmployeeEmail,
      EmployeePhone: req.body.EmployeePhone,
      EmployeeCity: req.body.EmployeeCity
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).json("updated successfully a employee with id = " + id);
  });
};

// Delete a employee by Id
exports.delete = (req, res) => {
  const id = req.params.id;
  Employee.destroy({
    where: { id: id }
  }).then(() => {
    res.status(200).json("deleted successfully a employee with id = " + id);
  });
};
