import React from "react";

import Button from "../../components/UI/Button/Button";
import classes from "./Todo.css";

const todo = props => {
  let date = props.date
    .split("-")
    .reverse()
    .join("-");

  const todoClasses = [classes.TodoDetails];
  const inputClasses = [classes.optionInput];
  if (props.completed) {
    todoClasses.push(classes.TodoCompleted);
    inputClasses.push(classes.active);
    // inputClasses.push(classes.optionInput);
  }
  return (
    <div className={classes.Todo}>
      <p className={classes.TodoDescription}>
        <strong>Stuff to do</strong>:{" "}
        <span className={todoClasses.join(" ")}>{props.todo}</span>
      </p>
      <p>Date: {date}</p>
      <Button btnType="Danger" clicked={props.deleteHandler}>
        Delete
      </Button>
      <Button btnType="Success" clicked={props.completeHandler}>
        Completed
      </Button>
      {/* {props.completed ? ( */}
        <input
          type="checkbox"
          className={inputClasses.join(" ")}
          checked
          readOnly
        />
         {/* ) : null}  */}
    </div>
  );
};

export default todo;
