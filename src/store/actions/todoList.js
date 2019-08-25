import * as actionTypes from "./actionTypes";
import axios from "../../axios-todo";

export const removeTodoList = todoId => {
  return {
    type: actionTypes.REMOVE_TODO_ITEM,
    todoId: todoId
  };
};

export const saveTodoFailed = error => {
  return {
    type: actionTypes.SAVE_TODO_FAILED,
    error: error
  };
};

export const saveTodoItemSuccess = (id, newTodo) => {
  return {
    type: actionTypes.SAVE_TODO_ITEM_SUCCESS,
    todoId: id,
    newTodo: newTodo
  };
};

export const saveTodoStart = () => {
  return {
    type: actionTypes.SAVE_TODO_START
  };
};

export const saveTodoUnauth = (todo) => {
  return{
    type: actionTypes.SAVE_TODO_UNAUTH,
    todo: todo
  };
};

export const resetList = () => {
  return {
    type: actionTypes.RESET_LIST
  };
};

export const saveTodoItem = (todo, token) => {
  return dispatch => {
    dispatch(saveTodoStart());
    if(token !== null) {
      axios
      .post("/todos.json?auth=" + token, todo)
      .then(response => {
        const newTodo = {
          id: response.data.name,
          ...todo
        };
        dispatch(saveTodoItemSuccess(response.data.name, newTodo));
      })
      .catch(error => {
        dispatch(saveTodoFailed(error));
      });
    } else {
      const newTodo = {
        id: new Date(),
        ...todo
      };
      dispatch(saveTodoUnauth(newTodo));
    }
    
  };
};
