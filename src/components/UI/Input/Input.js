import React from "react";

import classes from "./Input.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const input = props => {
  let inputElement = null;
  let inputClasses = [classes.InputElement];

  let validationError = null;
  // if (props.listsClassname) {
  //   inputClasses = [props.listsClassname];
  // }

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  if (props.invalid && props.touched) {
    validationError = (
      <p className={classes.ValidationError}>
        Please enter a valid {props.valueType}
      </p>
    );
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "date":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    // <div className={!props.lists ? classes.Input : props.lists}>
    // { <label className={classes.Label}>{props.label}</label> }
    <Aux>
      {validationError}
    <div className={classes.Input}>
      {inputElement}
      <label className={props.completed ? classes.LabelLine : null}>{props.label}</label>
    </div>
    </Aux>
    //  </div>
  );
};

export default input;
