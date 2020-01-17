import React, { Component } from "react";
import axios from "axios";
class EmployeeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmployeeName: "",
      EmployeeEmail: "",
      EmployeePhone: "",
      EmployeeCity: "",
      showModal: true,
      editable: this.props.match.params.id ? true : false
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8081/" + this.props.match.params.id)
      .then(response => {
        console.log(response.data);
        this.setState({
          EmployeeName: response.data.EmployeeName,
          EmployeeEmail: response.data.EmployeeEmail,
          EmployeePhone: response.data.EmployeePhone,
          EmployeeCity: response.data.EmployeeCity
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  onChangeToEmployee = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    this.props.history.push("/");
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.history.push("/");
    const obj = {
      EmployeeName: this.state.EmployeeName,
      EmployeeEmail: this.state.EmployeeEmail,
      EmployeePhone: this.state.EmployeePhone,
      EmployeeCity: this.state.EmployeeCity
    };
    console.log(this.editable);
    console.log(this.props.match.params.id);
    if (this.editable !== this.props.match.params.id) {
      axios
        .post("http://localhost:8081/update/" + this.props.match.params.id, obj)
        .then(res => console.log(res.data));
      this.props.history.push("/");
      window.location.reload(false);
    } else {
      axios
        .post("http://localhost:8081/add", obj)
        .then(res => console.log(res.status));
      this.setState({
        EmployeeName: "",
        EmployeeEmail: "",
        EmployeePhone: "",
        EmployeeCity: ""
      });
      window.location.reload(false);
    }
  };
  render() {
    return (
      <div>
        <h3>
          {" "}
          {this.state.editable
            ? "Update Employee Detail"
            : "Add Employee Detail"}
        </h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.EmployeeName}
              onChange={this.onChangeToEmployee}
              name="EmployeeName"
              placeholder={"Enter  Name"}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.EmployeeEmail}
              onChange={this.onChangeToEmployee}
              name="EmployeeEmail"
              placeholder={"Enter  Email"}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.EmployeePhone}
              onChange={this.onChangeToEmployee}
              name="EmployeePhone"
              placeholder={"Enter  Phone"}
              required
            />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.EmployeeCity}
              onChange={this.onChangeToEmployee}
              name="EmployeeCity"
              placeholder={"Enter  City"}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value={this.state.editable ? "Update" : "Add"}
              className="btn btn-primary"
            />{" "}
            <input
              type="button"
              onClick={this.handleCloseModal}
              value="Close"
              className="btn btn-secondary"
            />
          </div>
        </form>
      </div>
    );
  }
}
export default EmployeeDetail;
