import React, { Component } from 'react'
import connect from 'react-redux'

//21.54
const Groceries = ({ groceries }) => {
    return (
        <ul>
            {groceries.map((grocery) => {
                return <li key={grocery.id}>{grocery.name}</li>
            })}
        </ul>
    )
}

export default connect(Groceries)
