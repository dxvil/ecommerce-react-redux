import { connect } from 'react-redux'
import 'firebase/auth'
import firebase from 'firebase'

import React from 'react'
import FormAuth from './Auth'

const AuthPage = (props) => {
    const onSubmit = () => {
        if (props.form) {
            const email = props.form.values.email
            const password = props.form.values.password
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    const ur = userCredential.user
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                })
        }
    }

    return (
        <div>
            <h1>Login Page</h1>
            <FormAuth onSubmit={onSubmit} />
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        form: state.form.login,
    }
}

export default connect(mapStateToProps, null)(AuthPage)
