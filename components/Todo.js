class Todo {
  constructor(data, selector, handleCheck, handleDelete, handleTotal) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
    this._handleTotal = handleTotal
  }

  _setEventListener() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._data.completed);
      this._todoElement.remove();
    });
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      this._handleCheck(this._data.completed);
    });
  }

  _generateDateEl() {
    const todoDate = this._todoElement.querySelector(".todo__date");
    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      todoDate.textContent = `Due: ${this._dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _generateCheckBoxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }
  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");

    todoNameEl.textContent = this._data.name;

    this._generateCheckBoxEl();
    this._setEventListener();
    this._generateDateEl();

    return this._todoElement;
  }
}

export default Todo;