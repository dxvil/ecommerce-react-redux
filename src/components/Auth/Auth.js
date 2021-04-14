import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Input as inputUI, Message } from "semantic-ui-react";
import { email, maxLengthCreator, required } from "../../tools/validators";
import { RenderInput } from "../SemanticUI/Input";

class Auth extends Component {
  render() {
    return (
      <form className="auth__form">
        <label>Login: </label>
        <Field
          component={RenderInput}
          placeholder="login"
          name="login"
          fName="Login"
          type="text"
          validate={required}
        />
        <label>Email: </label>
        <Field
          component={RenderInput}
          placeholder="email"
          name="email"
          fName="Email"
          validate={[required, email]}
          type="email"
          required
        />
        <label>Password: </label>
        <Field
          placeholder="password"
          name="password"
          fName="Password"
          type="password"
          validate={required}
          component={RenderInput}
        />
        <div
          className="ui submit button st-btn"
          onClick={this.props.onHandleSubmit}
        >
          Submit
        </div>
      </form>
    );
  }
}

Auth = reduxForm({ form: "registration" })(Auth);

export default Auth;
