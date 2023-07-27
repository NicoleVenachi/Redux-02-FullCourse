import { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {
  increment,
  decrement,
  reset,
  incrementByAmount
} from './counterSlice'

const Counter = () => {

  const count = useSelector(state => state.counter.count)
  const dispatch = useDispatch()

  //para capturar el input y pasarlo a un numero
  const [incrementAmount, setByIncrementAmount] = useState(0)
  const addValue = Number(incrementAmount) || 0;

  //resetamos tanto estado, como el increment amount 
  const resetAll = () => {
    setByIncrementAmount(0)
    dispatch(reset())
  }

  return (
    <section>
      <p> {count} </p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>

      <input
        type='text'
        value={incrementAmount}
        onChange={(e) => setByIncrementAmount(e.target.value)}
      />

      <div>
        <button onClick={() => dispatch(incrementByAmount(addValue))}>Add amount</button>
        <button onClick={resetAll}>Reset</button>
      </div>


    </section>
  )
}

export default Counter

