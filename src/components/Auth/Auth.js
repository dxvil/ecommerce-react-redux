import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'

const Auth = (props) => {
    // const auth = (e, pd) => {
    //
    // }

    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field
                        placeholder='email'
                        name='email'
                        type='text'
                        component={'input'}
                    />
                </div>
                <div>
                    <Field
                        placeholder='login'
                        name='login'
                        component={'input'}
                    />
                </div>
                <div>
                    <Field
                        placeholder='password'
                        name='password'
                        component={'input'}
                    />
                </div>
                <button onClick={props.onSubmit}>Submit</button>
            </form>
        </div>
    )
}

const FormAuth = reduxForm({ form: 'login' })(Auth)

export default FormAuth
