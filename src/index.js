import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { connect } from 'react-redux'
import Groceries from './Groceries'
import axios from 'axios'

const store = createStore(
    (state = { loading: true, groceries: [] }, action) => {
        if(action.type === 'LOADED'){
            state = {...state, loading: false };
        }
        else if(action.type === 'LOAD_GROCERIES'){
            state = {...state, groceries: action.groceries };
        }
        return state
    }
)

const LOADED = 'LOADED';
const LOAD_GROCERIES = 'LOAD_GROCERIES';

const loaded = () => {
    return {
        type: LOADED
    };
}

const loadGroceries = (groceries) => {
    return {
        type: LOAD_GROCERIES,
        groceries
    }
}

class _App extends Component {
    componentDidMount(){
        this.props.load();
    }
    render() {
        return (
            <div>
                <h1>Acme Groceries</h1>
                <Groceries />
            </div>
        )
    }
}

// const mapStateToProps = ({ loading }) => {
//     return {
//         loading,
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         load: async () => {
//             const groceries = (await axios.get('/api/groceries')).data
//             dispatch({
//                 type: 'LOAD_GROCERIES',
//                 groceries,
//             })
//             dispatch({
//                 type: 'LOADED',
//                 groceries,
//             })
//         },
//     }
// }

const App = connect(
    state=> state,
    (dispatch)=> {
        return {
            load: async()=> {
                const groceries = (await axios.get('/api/groceries')).data;
                dispatch(loaded());
                dispatch(loadGroceries(groceries));
            }
        }
    }
)(_App);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
)
