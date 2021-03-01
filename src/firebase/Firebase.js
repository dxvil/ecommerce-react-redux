import firebase from 'firebase'
import 'firebase/database'
import 'firebase/auth'
import { firebaseConfig } from './firebaseConfig'

export const init = () => {
    firebase.initializeApp(firebaseConfig)
}

init()

export const db = firebase.firestore()

export const deleteCollection = (path) => {
    db.collection(path)
        .get()
        .then((res) => {
            res.forEach((item) => {
                item.ref.delete()
            })
        })
}

export const createDatabase = (path, item) => {
    db.collection(path)
        .add({
            item,
        })
        .then(function (docRef) {
            return docRef
        })
        .then((data) => {
            return data
        })
        .catch(function (error) {
            throw new Error(error)
        })
}

export const bindingData = (path) => {
    return db
        .collection(path)
        .get()
        .then((items) => {
            let arr = []
            items.forEach((item) => {
                let transformVar = item.data()
                return arr.push(transformVar)
            })
            return arr
        })
}

export const createAccount = (em, pass) => {
    let email = em
    let password = pass
    let user = firebase.auth().currentUser

    if (user.email !== email) {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                return { email, password }
            })
            .catch((error) => {
                return error.message
            })
    }
}

const setUserPassword = (pass) => {
    let user = firebase.auth().currentUser
    user.updatePassword(pass)
        .then(function () {
            // Update successful.
        })
        .catch(function (error) {
            // An error happened.
        })
}

const loginAccount = (em, pass) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(em, pass)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user
            // ...
        })
        .catch((error) => {
            var errorCode = error.code
            var errorMessage = error.message
        })
}
