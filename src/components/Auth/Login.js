import React from "react";
import { Field, reduxForm } from "redux-form";
import { email, required } from "../../tools/validators";
import { RenderInput } from "../SemanticUI/Input";

let Login = (props) => {
  return (
    <div className="auth-page">
      <div className="form-wrapper">
        <h1>Login</h1>
        <form>
          <label>Email: </label>
          <Field
            component={RenderInput}
            placeholder="email"
            name="email"
            validate={[required, email]}
            type="email"
          />
          <label>Password: </label>
          <Field
            placeholder="password"
            name="password"
            type="password"
            validate={required}
            component={RenderInput}
          />
          <div
            onClick={props.onHandleSubmit}
            className="ui submit button st-btn"
          >
            Submit
          </div>
        </form>
      </div>
    </div>
  );
};

const UserLogin = reduxForm({ form: "login" })(Login);

export default UserLogin;
