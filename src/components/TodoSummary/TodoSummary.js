import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Button from "../UI/Button/Button";

class TodoSummary extends Component {
  // This could be a functional component, no need to be a class

  render() {
    const todoSummary = this.props.todos.map(todo => {
      return (
        <li key={todo.id}>
          <strong>Stuff to do: </strong>
          {todo.todo} <br /> <strong> Due:</strong> {todo.date}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Todo List Details</h3>
        <ul>{todoSummary}</ul>
        <p>Continue to details page?</p>
        <Button btnType="Danger" clicked={this.props.viewCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.viewContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default TodoSummary;
