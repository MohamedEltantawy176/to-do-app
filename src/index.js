// import { createStore, combineReducers } from "./MyRedux";
import { createStore, combineReducers } from "redux";

//-----------------------------------------------------------//
// Actions

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

/* Reducer */
const initialState = { todoItems: [] };

// action creators
const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    todo
  };
};

const removeTodo = (id) => {
  return {
    type: REMOVE_TODO,
    id
  };
};

const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    id
  };
};

//-----------------------------------------------------------//
// Reducers

function reducer(state = initialState, action) {
  switch (action.type) {
    // Add todo case
    case ADD_TODO:
      return {
        ...state,
        todoItems: [...state.todoItems, action.todo]
      };

    // Remove todo case
    case REMOVE_TODO:
      const newTodos = state.todoItems.filter((todo) => todo.id !== action.id);
      return {
        ...state,
        todoItems: newTodos
      };

    // Toggle todo case
    case TOGGLE_TODO:
      // copy all todo items
      let todos = [...state.todoItems];

      // loop and update the state of selected todo item
      todos = todos.map((todo) => {
        if (todo.id === action.id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });

      return {
        ...state,
        todoItems: todos
      };

    default:
      return state;
  }
}

//-----------------------------------------------------------//
// Store

const { getState, dispatch, subscribe } = createStore(reducer, initialState);

// add listener to changes in state
subscribe(() => onStateUpdate());

//-----------------------------------------------------------//
// UI quries

const form = document.getElementById("todo-form");
const todoListElement = document.querySelector("#todo-list");
const todoTextInput = document.querySelector("#todoTextInput");
const todoCompletedInput = document.querySelector("#input-completed-checkbox");

//-----------------------------------------------------------//
// UI events

// global track of the current id
// TODO: Generate random id
let currentId = 0;

form.onsubmit = (e) => {
  e.preventDefault();

  console.log(todoCompletedInput.checked);

  // Build a new todo object, don't forget to append an ID
  const newTodo = {
    id: currentId++,
    text: todoTextInput.value,
    completed: todoCompletedInput.checked
  };

  // Dispatch an action to add a new todo
  dispatch(addTodo(newTodo));
};

//-----------------------------------------------------------//
// UI builder

const onStateUpdate = () => {
  // Get updated state with getState
  const { todoItems } = getState();

  // clear the current UI list
  todoListElement.innerHTML = "";

  todoItems.forEach((todoItem) => {
    const todoLi = document.createElement("li");
    const todoContainer = document.createElement("div");
    const todoCheckbox = document.createElement("input");
    const todoText = document.createElement("p");
    const todoDelete = document.createElement("button");

    // div container
    todoContainer.className = "row";

    // text
    todoText.innerHTML = todoItem.text;
    todoText.id = "todoText";

    // checkbox
    todoCheckbox.id = "todoCheck";
    todoCheckbox.type = "checkbox";
    todoCheckbox.checked = todoItem.completed;

    // delete button
    todoDelete.id = "todoDelete";
    todoDelete.textContent = "Delete";

    // handlers
    todoDelete.onclick = () => {
      dispatch(removeTodo(todoItem.id));
    };

    todoCheckbox.onchange = () => {
      dispatch(toggleTodo(todoItem.id));
    };

    // Build div container
    todoContainer.append(todoCheckbox, todoText, todoDelete);
    todoLi.appendChild(todoContainer);
    todoListElement.appendChild(todoLi);
  });
};

//-----------------------------------------------------------//
// Temp reference

const todoItem = {
  id: "asteqrt",
  text: "Buy chocolate",
  completed: true
};

const state = {
  todoItems: [
    {
      id: 0,
      text: "todo 1",
      completed: false
    },
    {
      id: 1,
      text: "todo 2",
      completed: false
    },
    {
      id: 2,
      text: "todo 3",
      completed: false
    }
  ]
};

//-----------------------------------------------------------//
