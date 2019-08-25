import React from "react";

import classes from "./Button.css";

const button = props => (
  <button
    className={[classes.Button, classes[props.btnType], props.isActive ? classes.Active : null].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;