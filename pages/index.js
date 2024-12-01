import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
console.log(uuidv4()); 
import { initialTodos, validationConfig } from "../utils/constants.js"; 
import Todo from "../components/Todo.js";
import formValidator from '../components/FormValidator.js';
import Section from '../components/section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';
 

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
// const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
// const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    const todo = generateTodo(values);
    section.addItem(todo);
    addTodoPopup.close();
    newTodoValidator.resetValidation();
    todoCounter.updateTotal(true);
    // console.log(inputValues.target.name.value);
    // console.log(inputValues.target.date.value);
  },
});
addTodoPopup.setEventListeners();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

function handleTotal(completed) {
  if (completed) {
    todoCounter.updateTotal(false);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    handleCheck,
    handleDelete,
    handleTotal
  );
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (data) => {
    const todo = generateTodo(data);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new formValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();