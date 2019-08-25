import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  todos: [],
  loading: false,
  filter: "SHOW_ALL_TODOS"
};

const fetchTodosStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchTodosSuccess = (state, action) => {
  return updateObject(state, { todos: action.todos, loading: false });
};
const fetchTodosFailed = (state, action) => {
  return updateObject(state, { loading: false });
};
const removeTodo = (state, action) => {
  return updateObject(state, {
    todos: [...state.todos].filter(todo => todo.id !== action.id)
  });
};

const updateCompletedSuccess = (state, action) => {
  const index = state.todos.findIndex(todo => todo.id === action.id);
  const updatedList = state.todos.slice(0);
  // const copiedObj = {...updatedList[index]};
  // copiedObj.completed = action.completed;
  const copiedObj = updateObject(updatedList[index], {
    completed: action.completed
  });
  updatedList[index] = copiedObj;
  return updateObject(state, { todos: updatedList });
};

const showAllTodos = (state, action) => {
  return updateObject(state, { filter: actionTypes.SHOW_ALL_TODOS });
};

const showActiveTodos = (state, action) => {
  return updateObject(state, { filter: actionTypes.SHOW_ACTIVE_TODOS });
};

const showCompletedTodos = (state, action) => {
  return updateObject(state, { filter: actionTypes.SHOW_COMPLETED_TODOS });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TODOS_START:
      return fetchTodosStart(state, action);
    case actionTypes.FETCH_TODOS_SUCCESS:
      return fetchTodosSuccess(state, action);
    case actionTypes.FETCHED_TODOS_FAILED:
      return fetchTodosFailed(state, action);
    case actionTypes.REMOVE_TODO:
      return removeTodo(state, action);
    case actionTypes.UPDATE_COMPLETED_SUCCESS:
      return updateCompletedSuccess(state, action);
    case actionTypes.SHOW_ALL_TODOS:
      return showAllTodos(state, action);
    case actionTypes.SHOW_ACTIVE_TODOS:
      return showActiveTodos(state, action);
    case actionTypes.SHOW_COMPLETED_TODOS:
      return showCompletedTodos(state, action);
    default:
      return state;
  }
};

export default reducer;
