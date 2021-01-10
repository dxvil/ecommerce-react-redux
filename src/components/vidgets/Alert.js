import React from 'react'
import './Alert.css'

const Alert = (props) => {
    return (
        <div className='alert'>
            <p>{props.text}</p>
        </div>
    )
}
export default Alert
