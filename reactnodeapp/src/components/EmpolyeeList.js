import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      query: "",
      filteredEmployees: []
    };
  }
  handleInputChange = event => {
    const query = event.target.value;
    this.setState(prevState => {
      const filteredEmployees = prevState.employees.filter(element => {
        return element.EmployeeName.toLowerCase().includes(query.toLowerCase());
      });
      return {
        query,
        filteredEmployees
      };
    });
  };

  getEmployee() {
    this.props.history.push("/");
    axios
      .get("http://localhost:8081/")
      .then(response => {
        this.setState({ employees: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillMount() {
    this.getEmployee();
  }

  employeeList() {
    console.log("que" + this.state.query);
    if (this.state.query == "") {
      return this.state.employees.map((Emp, i) => (
        <tr key={i}>
          <td>{Emp.EmployeeName}</td>

          <td>{Emp.EmployeeEmail}</td>
          <td>{Emp.EmployeePhone}</td>
          <td>{Emp.EmployeeCity}</td>

          <Link to={"/edit/" + Emp.id}>
            <img src="https://img.icons8.com/metro/26/000000/edit.png" />
          </Link>

          <Link onClick={this.delete(Emp.id)}>
            <img src="https://img.icons8.com/windows/32/000000/delete-forever.png" />
          </Link>
        </tr>
      ));
    } else {
      return this.state.filteredEmployees.map((Emp, i) => (
        <tr key={i}>
          <td>{Emp.EmployeeName}</td>
          <td>{Emp.EmployeeEmail}</td>
          <td>{Emp.EmployeePhone}</td>
          <td>{Emp.EmployeeCity}</td>
          <Link to={"/edit/" + Emp.id}>
            <img src="https://img.icons8.com/metro/26/000000/edit.png" />
          </Link>

          <Link onClick={this.delete(Emp.id)}>
            <img src="https://img.icons8.com/windows/32/000000/delete-forever.png" />
          </Link>
        </tr>
      ));
    }
  }

  delete(id) {
    return () => {
      confirmAlert({
        title: "Confirm to Delete",
        message: "Are you sure to do this.",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              axios.post("http://localhost:8081/delete/" + id);
              console.log();
              this.getEmployee(id);
            }
          },
          {
            label: "No",
            onClick: () => "Click No"
          }
        ]
      });
    };
  }

  render() {
    return (
      <div className="container">
        <h4>
          {" "}
          Employees:
          <input
            style={{ width: 150 }}
            placeholder="Search for..."
            onChange={this.handleInputChange}
          />
        </h4>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name:</th>
              <th>EmailId: </th>
              <th>PhoneNo:</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.employeeList()}</tbody>
        </table>
      </div>
    );
  }
}
export default EmployeeList;
