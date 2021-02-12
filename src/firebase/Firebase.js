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
