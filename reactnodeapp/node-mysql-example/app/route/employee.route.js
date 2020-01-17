module.exports = function(app) {
  const employees = require("../controller/employee.controller.js");

  // Create a new employees
  app.post("/add/", employees.create);

  // Retrieve all employees
  app.get("/", employees.findAll);

  // Retrieve a single employees by Id
  app.get("/:id", employees.findByPk);

  // Update a employees with Id
  app.post("/update/:id", employees.update);

  // Delete a employees with Id
  app.post("/delete/:id", employees.delete);
};
