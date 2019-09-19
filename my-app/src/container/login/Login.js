import React, { Component } from "react";
import { FormGroup, Row, FormControl, Container, Col } from "react-bootstrap";
import { hashHistory } from "react-router";
import loginStyle from "./LoginStyle.css";
import * as config from "../common/config";

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loginObj: {
        userId: "",
        password: ""
      },
      loginErrorFlag: false,
      loginValidationFlag: false
    };
  }

  /*user defined fucntions */

  handleChange(event) {
    let info = this.state.loginObj;
    info[event.target.name] = event.target.value;
    this.setState({ loginObj: info });
  }

  handleLogin() {
    var info = this.state.loginObj;
    if (info.userId && info.password) {
      let data = { username: info.userId, credential: info.password };

      /*Post http api call for login*/
      var http = new XMLHttpRequest();
      var url = config.getUrl("getToken");
      var params = `username=${data.username}&credential=${data.credential}`;
      http.open("POST", url, true);
      http.withCredentials = true;
      http.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) {
          hashHistory.push({ pathname: "search" });
        } else {
          /*show error if credentials are wrong */
          this.setState({ loginValidationFlag: true });
        }
      };
      http.send(params);
      http.onerror = error => {
        this.setState({ loginErrorFlag: true });
      };
    } else {
      /*show error if fields are empty */
      this.setState({ loginErrorFlag: true });
    }
  }

  render() {
    return (
      <Row>
        <Col sm={4} md={4} xs={4} />
        <Col sm={4} md={4} xs={4}>
          <div className={loginStyle.loginContainer}>
            <div className={loginStyle.loginForm}>
              <div className={loginStyle.loginHeading}>
                <span>Login</span>
              </div>
              <Container fluid={true}>
                <form>
                  <Row className="show-grid">
                    <FormGroup>
                      <FormControl
                        name="userId"
                        type="text"
                        value={this.state.loginObj.userId || ""}
                        placeholder="Enter your Username"
                        onChange={this.handleChange.bind(this)}
                      />
                    </FormGroup>
                  </Row>
                  <Row className="show-grid">
                    <FormGroup>
                      <FormControl
                        name="password"
                        type="password"
                        value={this.state.loginObj.password || ""}
                        placeholder="Enter your Password"
                        onChange={this.handleChange.bind(this)}
                      />
                    </FormGroup>
                  </Row>
                  <Row>
                    <button
                      type="button"
                      className={`btn pull-right ${loginStyle.loginButton}`}
                      onClick={this.handleLogin.bind(this)}
                    >
                      Login
                    </button>
                  </Row>
                </form>
              </Container>
              <hr style={{ color: "white" }} />
              {(this.state.loginErrorFlag ||
                this.state.loginValidationFlag) && (
                <div className={loginStyle.loginError}>
                  Please contact the System Administrator at extension 1001 to
                  create a new Login or reset password.
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col sm={4} md={4} xs={4} />
      </Row>
    );
  }
}

export default Login;
