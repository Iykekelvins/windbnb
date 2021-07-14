import React from "react";
import modalStyles from "../styles/Modal.module.css";

const Users = ({
  increaseChild,
  decreaseChild,
  increaseAdult,
  decreaseAdult,
  adult,
  child,
}) => {
  return (
    <div className={modalStyles.users}>
      <div>
        <h4>Adults</h4>
        <p>Ages 13 or above</p>
        <div className={modalStyles.counter}>
          <button onClick={decreaseAdult}>-</button>
          <span>{adult}</span>
          <button onClick={increaseAdult}>+</button>
        </div>
      </div>
      <div>
        <h4>Children</h4>
        <p>Ages 2-12</p>
        <div className={modalStyles.counter}>
          <button onClick={decreaseChild}>-</button>
          <span>{child}</span>
          <button onClick={increaseChild}>+</button>
        </div>
      </div>
    </div>
  );
};

export default Users;
