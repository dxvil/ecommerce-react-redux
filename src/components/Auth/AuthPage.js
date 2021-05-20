import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import 'firebase/auth'

import React, { useState } from 'react'

import FormAuth from './Auth'
import './Auth.css'
import { Message } from 'semantic-ui-react'
import { createUserMiddleware } from '../../redux/midllewares/createAcc'
import firebase from 'firebase'
import {loginAcc} from "../../redux/midllewares/loginAcc";

const AuthPage = (props) => {
    const [alert, setAlert] = useState(false)
    const [signedIn, setSignedIn] = useState(false)
    const [message, setMessage] = useState('')

    const onHandleRegistration = () => {
        let user = firebase.auth().currentUser
        if (!user && props.form.values) {
            props.createUser(
                props.form.values.email,
                props.form.values.password,
                props.form.values.login
            )
        } else if (
            props.form.values === undefined ||
            !props.form.values.login ||
            !props.form.values.password ||
            !props.form.values.email
        ) {
            setMessage('Please, fulfill the form')
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 1500)
        } else if (user) {
            setMessage('The user is already log in')
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
                setSignedIn(true)
            }, 1500)
        }
    }
    return (
        <div className='auth-page'>
            <div className='form-wrapper'>
                <h1 className='auth-page__header'>Registration</h1>
                <FormAuth onHandleRegistration={onHandleRegistration}/>
                <Link to={'/login'}>Already have an account?</Link>
                {alert ? <Message negative>{message}</Message> : null}
                {signedIn || props.isLog || props.login ? <Redirect to='/gocheckout' /> : null}
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        form: state.form.registration,
        isLog: state.login.isLog,
        login: state.login
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        createUser: (em, pass, login) => {
            return dispatch(createUserMiddleware(em, pass, login))
        },
        loginUser: (em, pass, login) => {
            return dispatch(loginAcc(em, pass, login))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
