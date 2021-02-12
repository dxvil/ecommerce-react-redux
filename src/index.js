import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import { Provider } from 'react-redux'
import store from './redux/store'
import {
    db,
    deleteCollection,
    setProductsToDatabase,
} from './firebase/Firebase'

ReactDOM.render(
    <Provider store={store}>
        <App cleanDB={deleteCollection} />
    </Provider>,
    document.getElementById('root')
)
