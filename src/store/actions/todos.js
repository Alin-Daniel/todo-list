import * as actionTypes from "./actionTypes";
import axios from "../../axios-todo";

export const fetchTodosStart = () => {
  return {
    type: actionTypes.FETCH_TODOS_START
  };
};

export const fetchTodosSuccess = (todos) => {
  return {
    type: actionTypes.FETCH_TODOS_SUCCESS,
    todos: todos
  };
};


export const fetchTodosFailed = (error) => {
    return {
        type: actionTypes.FETCHED_TODOS_FAILED,
        error: error
    };
};

export const fetchTodos = (token, userId) => {
  return dispatch => {
    dispatch(fetchTodosStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get('/todos.json' + queryParams)
      .then(res => {
        const fetchedTodos = Object.keys(res.data).sort().map(key => {
          return {
            id: key,
            ...res.data[key]
          };
        });     
          dispatch(fetchTodosSuccess(fetchedTodos));
      })
      .catch(error => {
          dispatch(fetchTodosFailed(error));
      });
  };
};

export const removeTodoSuccess = (id) => {
  return {
    type: actionTypes.REMOVE_TODO,
    id: id  
  };
};

export const removeTodo = (id, token) => {
  return dispatch => {
      axios
      .delete("/todos/" + id + ".json?auth=" + token)
      .then(response => {
        dispatch(removeTodoSuccess(id));
      })
      .catch(error => {
        
      });
  }
}

export const updateCompletedSuccess = (id, completed) => {
  return {
    type: actionTypes.UPDATE_COMPLETED_SUCCESS,
    id: id,
    completed: completed
  };
};

export const updateCompletedTodo = (id, token, completed) => {
  return dispatch => {
    const updatedData = {completed: !completed};
    dispatch(updateCompletedSuccess(id, updatedData));
    axios.patch('/todos/' + id + '.json?auth=' + token, updatedData)
    .then(response => {
      
      dispatch(updateCompletedSuccess(id, response.data.completed));
    })
    .catch(error => {

    });
  };
}

export const showAllTodos = () => {
  return {
    type: actionTypes.SHOW_ALL_TODOS
  };
};
export const showActiveTodos = () => {
  return {
    type: actionTypes.SHOW_ACTIVE_TODOS
  };
};

export const showCompletedTodos = () => {
  return {
    type: actionTypes.SHOW_COMPLETED_TODOS
  };
};