import React from "react";

import classes from "./CloseButton.css";

const closeButton = props => (
  <div onClick={props.clicked} className={classes.Close}>
    <div className={classes.inner} />
  </div>
);

export default closeButton;
