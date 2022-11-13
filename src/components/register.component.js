import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";





const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Username must be 3-20 characters
      </div>
    );
  }
};

const vaddress = value => {
  if(value.length < 3 || value.length > 150) {
    return (
      <div className="alert alert-danger" role="alert">
        Please Enter a valid address.
      </div>
    );
  }
};

const vphone = value => {
  if(value.length < 10 || value.length > 20) {
    return(
      <div className="alert alert-danger" role="alert">
        Enter a valid phone number.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 to 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.address,
        this.state.phone,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div>
        <br/>
        <div className="container" >
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
            
              <br/>
              <div className="card-body">
              <Form
                backgroundcolour="dark" 
                onSubmit={this.handleRegister}
                className="row g-3"
                ref={c => {
                  this.form = c;
                }}>
                {!this.state.successful && (
                  <div>
                    <div className="form-group col-12">
                    <h3 className="text-center">Create Your Account</h3>
                      <label htmlFor="username" className="form-label" >Username</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        validations={[required, vusername]}
                      />
                    </div>

                    <div className="form-group col-12">
                      <label htmlFor="email" className="form-label">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required, email]}
                      />
                    </div>

                    <div className="form-group col-12">
                      <label htmlFor="address" className="form-label">Address</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="address"
                        value={this.state.address}
                        onChange={this.onChangeAddress}
                        validations={[required, vaddress]}
                      />
                    </div>

                    <div className="form-group col-12">
                      <label htmlFor="phone" className="form-label">Phone No.</label>
                      <Input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.onChangePhone}
                        validations={[required, vphone]}
                      />
                    </div>

                    <div className="form-group col-12">
                      <label htmlFor="password" className="form-label">Password</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required, vpassword]}
                      />
                    </div>
                    <br/>
                    <div className="form-group col-md-4">
                      <button className="btn btn-primary btn-block">Register</button>
                    </div>
                  </div>
                )}

                {this.state.message && (
                  <div className="form-group">
                    <div
                      className={
                        this.state.successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {this.state.message}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
         
    );
  }
}
