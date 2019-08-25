import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  lists: [],
  loading: false,
  error: false
};

const saveTodoStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const saveTodoItemSuccess = (state, action) => {
  return updateObject(state, {
    lists: state.lists.concat(action.newTodo),
    loading: false
  });
};

const saveTodoItemFailed = (state, action) => {
  return updateObject(state, { loading: false, error: true });
};

const saveTodoUnauth = (state, action) => {
  return updateObject(state, {
    lists: state.lists.concat(action.todo),
    loading: false
  });
};

const resetList = (state, action) => {
  return updateObject(state, { lists: [] });
};

const removeTodoItem = (state, action) => {
  return updateObject(state, {
    lists: [...state.lists].filter(list => list.id !== action.todoId)
  });
};

const todoList = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_TODO_START:
      return saveTodoStart(state, action);
    case actionTypes.SAVE_TODO_ITEM_SUCCESS:
      return saveTodoItemSuccess(state, action);
    case actionTypes.SAVE_TODO_FAILED:
      return saveTodoItemFailed(state, action);
    case actionTypes.REMOVE_TODO_ITEM:
      return removeTodoItem(state, action);
    case actionTypes.SAVE_TODO_UNAUTH:
      return saveTodoUnauth(state, action);
    case actionTypes.RESET_LIST:
      return resetList(state, action);
    default:
      return state;
  }
};

export default todoList;
