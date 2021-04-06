import React, { useState } from 'react'
import './GoCheckout.css'
import { DeliveryUser } from './DeliveryUser'
import { DeliveryInfo } from './DeliveryInfo'
export const GoCheckout = (props) => {
    const [date, setDate] = useState(new Date())
    return (
        <div className='delivery'>
            <DeliveryInfo />
            <DeliveryUser />
            <div className='delivery__time'>
                <p>
                    Дата доставки:
                    <br />
                    {date.getDate() + 3 < 10
                        ? '0' + (date.getDate() + 3) + '.'
                        : date.getDate() + '.'}
                    {date.getMonth() < 10
                        ? '0' + date.getMonth() + '.'
                        : date.getMonth() + '.'}
                    {date.getFullYear()}
                </p>
                <button className='delivery__confirm'>Перейти к оплате</button>
            </div>
        </div>
    )
}
