import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import { Provider } from 'react-redux'
import store from './redux/store'
import * as firebase from 'firebase'
import { firebaseConfig } from './firebase/firebaseConfig'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
