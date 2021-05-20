import React, {useState} from "react";
import {Field, formValueSelector, reduxForm} from "redux-form";
import {email, minLength, required} from "../../tools/validators";
import { RenderInput } from "../SemanticUI/Input";
import {loginAcc} from "../../redux/midllewares/loginAcc";
import {connect} from "react-redux";

let Login = (props) => {

const onHandleLogin = async () => {
  const result = await props.dispatch(loginAcc(props.email, props.password))
}
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
            validate={[required, minLength]}
            component={RenderInput}
          />
          <div
            onClick={onHandleLogin}
            className="ui submit button st-btn"
          >
            Submit
          </div>
        </form>
      </div>
    </div>
  );
};




let UserLogin = reduxForm({ form: "login" })(Login);

const selector = formValueSelector('login')

UserLogin = connect(state => {
const email = selector(state, 'email')
  const password = selector(state, 'password')
  const login = selector(state, state.login)
  return {
  email, password, login
  }
})(UserLogin)

export default UserLogin;
