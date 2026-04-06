import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount
} from "../../features/counterSlice.jsx";

export const CounterUI = () => {
  const count = useSelector((state) => state.counter.value);
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  return (
    <div className="container">
      <div className="counter-card">
        <h1>Current Count</h1>
        <div className="count-display">{count}</div>

        <div className="button-group">
          <button onClick={() => dispatch(decrement())}>- Decrease</button>
          <button onClick={() => dispatch(increment())}>+ Increase</button>
          <input
            type="text"
            name="count"
            id=""
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="btn-add-5"
            onClick={() => dispatch(incrementByAmount(Number(amount) || 0))}
          >
            + Add Amount
          </button>
          <button
            className="btn-add-5"
            onClick={() => dispatch(decrementByAmount(Number(amount) || 0))}
          >
            - Substract Amount
          </button>
        </div>
      </div>
    </div>
  );
};
