import React from "react";

import todoLogo from "../../assets/images/react-logo.png";
import classes from "./Logo.css";

const logo = props => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={todoLogo} alt="todo" />
  </div>
);

export default logo;
