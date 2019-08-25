import React, { Component } from "react";
import axios from "../../axios-todo";
import Todo from "../../components/Todo/Todo";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Todos.css';
import * as actionTypes from '../../store/actions/actionTypes';

class Todos extends Component {
  state = {
    error: this.props.error
  };

  componentDidMount() {
    this.props.onFetchTodos(this.props.token, this.props.userId);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.props.todos &&
  //     prevProps.todos &&
  //     this.props.todos.length !== prevProps.todos.length
  //   ) {
  //     this.props.onFetchTodos(this.props.token, this.props.userId);
  //   }
  // }

  onCompleteHandler = (id, token, completed) => {
    this.props.onUpdateHandler(id, token, completed);
  };

  render() {
    let todos = <Spinner />;
    let todosCounter = this.props.todos.reduce((acc, todo) => {
      return !todo.completed ? ++acc : acc;
    }, 0);

    if (!this.props.loading) {
      todos = this.props.filteredTodos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo.todo}
          date={todo.date}
          completed={todo.completed}
          deleteHandler={() => this.props.onDeleteHandler(todo.id, this.props.token)}
          completeHandler={() => this.onCompleteHandler(todo.id, this.props.token, todo.completed)}
        />
      ));
    }
    
    return (
      <Aux>
        <div className={classes.Filter}>
        <Button btnType="Filter" isActive={this.props.active === actionTypes.SHOW_ALL_TODOS} clicked= {this.props.onShowAllTodos}>All</Button>
        <Button btnType="Filter" isActive={this.props.active === actionTypes.SHOW_ACTIVE_TODOS} clicked= {this.props.onShowActiveTodos}>Active</Button>
        <Button btnType="Filter" isActive={this.props.active === actionTypes.SHOW_COMPLETED_TODOS} clicked={this.props.onShowCompletedTodos}>Completed</Button>
        </div>
        <p className={classes.Filter}>You have: {todosCounter} task(s) left</p>
        {todos}
      </Aux>
    )
  }
}

const filterTodos = (todos, action) => {
  switch(action) {
    case actionTypes.SHOW_ALL_TODOS:
      return todos;
    case actionTypes.SHOW_ACTIVE_TODOS:
      return todos.filter(todo =>todo.completed !== true);
    case actionTypes.SHOW_COMPLETED_TODOS:
      return todos.filter(todo => todo.completed === true);  
    default:
      return todos;  
  };
};

const mapStateToProps = state => {
  return {
    filteredTodos: filterTodos(state.todosReducer.todos, state.todosReducer.filter),
    todos: state.todosReducer.todos,
    loading: state.todosReducer.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    active: state.todosReducer.filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTodos: (token, userId) => dispatch(actions.fetchTodos(token, userId)),
    onDeleteHandler: (id, token) => dispatch(actions.removeTodo(id, token)),
    onUpdateHandler: (id, token, completed) => dispatch(actions.updateCompletedTodo(id, token, completed)),
    onShowAllTodos: () => dispatch(actions.showAllTodos()),
    onShowActiveTodos: () => dispatch(actions.showActiveTodos()),
    onShowCompletedTodos: () => dispatch(actions.showCompletedTodos())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Todos, axios));
