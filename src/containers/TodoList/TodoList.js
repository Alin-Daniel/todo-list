import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Input from "../../components/UI/Input/Input";
import classes from "./TodoList.css";
import Lists from "../../components/Todo/Lists/Lists";
import Modal from "../../components/UI/Modal/Modal";
import TodoSummary from "../../components/TodoSummary/TodoSummary";
import axios from "../../axios-todo";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";

export class TodoList extends Component {
  date = new Date();
  year = this.date.getFullYear();
  month = ("0" + (this.date.getMonth() + 1)).slice(-2);
  day = ("0" + this.date.getDate()).slice(-2);
  today = this.year + "-" + this.month + "-" + this.day;

  state = {
    listsForm: {
      todo: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Stuff to do"
        },
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      date: {
        elementType: "input",
        elementConfig: {
          type: "date",
          placeholder: ""
        },
        value: this.today,
        validation: {
          required: true
        },
        valid: true,
        touched: false
      }
    },
    viewDetails: false,
    formIsValid: false
  };

  componentDidMount() {
    this.props.onResetList();
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedInput = updateObject(this.state.listsForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.listsForm[inputIdentifier].validation
      ),
      touched: true
    });

    const updatedForm = updateObject(this.state.listsForm, {
      [inputIdentifier]: updatedInput
    });

    let formIsValid = true;
    for (let key in updatedForm) {
      formIsValid = updatedForm[key].valid && formIsValid;
    }

    this.setState({ listsForm: updatedForm, formIsValid: formIsValid });
  };

  addTodoHandler = event => {
    event.preventDefault();
    if (!this.state.formIsValid) {
      return;
    }

    const formData = {};
    formData.completed = false;
    formData.userId = this.props.userId;

    for (let key in this.state.listsForm) {
      formData[key] = this.state.listsForm[key].value;
    }

    this.props.onTodoSaved(formData, this.props.token);

    //clear the input
    const updatedInput = updateObject(this.state.listsForm.todo, {
      value: ""
    });

    const updatedForm = updateObject(this.state.listsForm, {
      todo: updatedInput
    });

    this.setState({ listsForm: updatedForm, formIsValid: false });
  };

  viewDetailsHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ viewDetails: true });
    } else {
      this.props.history.push("/auth");
    }
  };

  cancelViewDetailsHandler = () => {
    this.setState({ viewDetails: false });
  };

  viewDetailsContinueHandler = () => {
    this.props.history.push("/all-todos");
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.listsForm) {
      formElementsArray.push({
        id: key,
        config: this.state.listsForm[key]
      });
    }

    let form = (
      <form onSubmit={this.addTodoHandler}>
        {formElementsArray.map(formElement => (
          <div key={formElement.id}>
            <Input
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              valueType={formElement.id}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={event => this.inputChangedHandler(event, formElement.id)}
            />
          </div>
        ))}
      </form>
    );

    let lists = (
      <Lists
        lists={this.props.lists}
        remove={this.props.onTodoRemove}
        viewDetails={this.viewDetailsHandler}
        isAuth={this.props.isAuthenticated}
      />
    );

    return (
      <Aux>
        <Modal
          show={this.state.viewDetails}
          modalClosed={this.cancelViewDetailsHandler}
        >
          <TodoSummary
            todos={this.props.lists}
            viewCanceled={this.cancelViewDetailsHandler}
            viewContinued={this.viewDetailsContinueHandler}
          />
        </Modal>
        <div className={classes.TodoList}>
          {form}
          {lists}
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    lists: state.todosList.lists,
    error: state.todosList.error,
    loading: state.todosList.loading,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTodoSaved: (todo, token) => dispatch(actions.saveTodoItem(todo, token)),
    onTodoRemove: todoId => dispatch(actions.removeTodoList(todoId)),
    onResetList: () => dispatch(actions.resetList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(TodoList, axios));
