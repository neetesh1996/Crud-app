import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeList from "./components/EmpolyeeList";
import EmployeeDetail from "./components/EmployeeDetail";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              EmployeeDetail
            </Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    View
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">
                    Add
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact component={EmployeeList} />
          <Route path="/edit/:id" component={EmployeeDetail} />
          <Route path="/create" component={EmployeeDetail} />
          {/* <Route path="/delete/:id"  component={DeleteEmployee}/>
           */}
        </div>
      </Router>
    );
  }
}

export default App;
