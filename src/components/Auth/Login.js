import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input as inputUI } from 'semantic-ui-react'
import { required } from '../../tools/validators'

let Login = (props) => {
    return (
        <div className='auth-page'>
            <div className='form-wrapper'>
                <h1>Login</h1>
                <form>
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
                        onClick={props.onHandleSubmit}
                        className='ui submit button st-btn'
                    >
                        Submit
                    </div>
                </form>
            </div>
        </div>
    )
}

const UserLogin = reduxForm({ form: 'login' })(Login)

export default UserLogin
