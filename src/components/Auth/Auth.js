import React, { useState } from 'react'
import 'firebase/auth'
import firebase from 'firebase'

const Auth = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState(false)
    const [user, setUser] = useState(null)
    const auth = (e, pd) => {
        if (login !== '' && password !== '') {
            const log = e.toString()
            const pass = pd.toString()
            firebase
                .auth()
                .createUserWithEmailAndPassword(log, pass)
                .then((userCredential) => {
                    // Signed in
                    const ur = userCredential.user
                    setStatus(true)
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    // ..
                })
        }
    }

    return (
        <div>
            {status === true ? (
                'Hello, world!'
            ) : (
                <form>
                    Auth
                    <label>Email: </label>
                    <input
                        value={login}
                        onInput={(e) => setLogin(e.target.value)}
                    />
                    <label>Password: </label>
                    <input
                        value={password}
                        onInput={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit' onClick={() => auth(login, password)}>
                        Submit
                    </button>
                </form>
            )}
        </div>
    )
}

export default Auth
