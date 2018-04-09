import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import {
    increment,
    decrement,
    incrementAsync,
    cancelIncrementAsync
} from '../actions';

const Counter = ({
    counter,
    countdown,
    increment,
    decrement,
    incrementAsync,
    cancelIncrementAsync
}) => {
    return (
        <div className="Counter">
            <h1>Redux saga Counter</h1>
            <div className="counter-content">
                <p className="counter-info">Clicked: {counter} times</p>
                <div className="sync-controls">
                    <button onClick={() => increment()}>
                        Increment
            </button>
                    <button onClick={() => decrement()}>
                        Decrement
            </button>
                </div>
                <div className="async-controls">
                    <button
                        onClick={
                            countdown ?
                                () => cancelIncrementAsync() :
                                () => incrementAsync(5)
                        }
                        style={{ color: countdown ? '#f00' : '#000' }}
                    >
                        {
                            countdown ?
                                `Cancel increment (${countdown})` :
                                'Increment after 5s'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

Counter.propTypes = {
    counter: PropTypes.number.isRequired,
    countdown: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    cancelIncrementAsync: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    counter: state.counter,
    countdown: state.countdown
});

const mapDispatchToProps = (dispatch) => ({
    increment: () => {
        dispatch(increment())
    },
    decrement: () => {
        dispatch(decrement())
    },
    incrementAsync: (value) => {
        dispatch(incrementAsync(value))
    },
    cancelIncrementAsync: () => {
        dispatch(cancelIncrementAsync())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);