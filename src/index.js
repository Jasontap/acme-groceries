import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import connect from 'react-redux'

const store = createStore(
    (state = { loading: true, groceries: [] }, action) => {
        return state
    }
)

class _App extends Component {
    render() {
        return (
            <div>
                <h1>Acme Groceries</h1>
                <Groceries />
            </div>
        )
    }
}

const mapStateToProps = ({ loading }) => {
    return {
        loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: async () => {
            const groceries = (await axios.get('/api/groceries')).data
            dispatch({
                type: 'LOAD_GROCERIES',
                groceries,
            })
            dispatch({
                type: 'LOADED',
                groceries,
            })
        },
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(_App) // mapDispatchToProps

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
)
