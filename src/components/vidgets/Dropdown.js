import React from 'react'

export const Dropdown = ({ action }) => {
    return (
        <select
            className='ui dropdown shop-dropdown'
            onChange={(e) => action(e)}
        >
            <option value='default'>Default</option>
            <option value='alphabet'>Sort by A-Z</option>
            <option value='reverse'>Sort by Z-A</option>
            <option value='low'>Sort by low price</option>
            <option value='high'>Sort by high price </option>
        </select>
    )
}
