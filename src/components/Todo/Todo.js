import React from "react";

import Button from "../../components/UI/Button/Button";
import Checkbox from '../UI/Checkbox/Checkbox';
import classes from "./Todo.css";

const todo = props => {
  let date = props.date
    .split("-")
    .reverse()
    .join("-");

  const todoClasses = [classes.TodoDetails];
  if (props.completed) {
    todoClasses.push(classes.TodoCompleted);
  
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
      <Checkbox completed={props.completed} checked readOnly/>
    </div>
  );
};

export default todo;
