import firebase from 'firebase'
import 'firebase/database'
import 'firebase/auth'
import { firebaseConfig } from './firebaseConfig'
import { products } from './items'

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

const deleteCollection = (path) => {
    db.collection(path)
        .get()
        .then((res) => {
            res.forEach((item) => {
                item.ref.delete()
            })
        })
}

export const setProductsToDatabase = (path) => {
    deleteCollection(path)
    products.forEach((item) => {
        db.collection('products')
            .add({
                item,
            })
            .then(function (docRef) {
                console.log('Document written')
            })
            .catch(function (error) {
                throw new Error(error)
            })
    })
}
