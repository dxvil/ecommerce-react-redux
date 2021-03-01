import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input as inputUI } from 'semantic-ui-react'
import { maxLengthCreator, required } from '../../tools/validators'

class Auth extends Component {
    render() {
        return (
            <form>
                <label>Login: </label>
                <Field
                    component={inputUI}
                    placeholder='login'
                    name='login'
                    type='text'
                />
                <label>Email: </label>
                <Field
                    component={inputUI}
                    placeholder='email'
                    name='email'
                    validate={required}
                    type='email'
                />
                <label>Password: </label>
                <Field
                    placeholder='password'
                    name='password'
                    type='password'
                    validate={required}
                    component={inputUI}
                />
                <div
                    className='ui submit button st-btn'
                    onClick={this.props.onHandleSubmit}
                >
                    Submit
                </div>
            </form>
        )
    }
}

Auth = reduxForm({ form: 'registration' })(Auth)

export default Auth
