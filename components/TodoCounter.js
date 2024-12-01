class TodoCounter { 
    constructor(todos, selector) {
      this._element = document.querySelector(selector);
      this._completed = todos.filter((todo) => todo.completed).length;
      this._total = todos.length;
      this._updateText();
      console.log(this._element);
      console.log(this._completed);
      console.log(this._total);
    }
  
    updateCompleted = (increment) => {
      if (increment) {
        this._completed += 1;
      } else {
        this._completed -= 1;
      }
      // this._completed += increment ? 1 : -1;
      this._updateText();
    };
  
    // Call this when a to-do is deleted, or when a to-do is
    // created via the form.
    updateTotal = (increment) => {
      if (increment) {
        this._total += 1;
      } else {
        this._total -= 1;
      }
      // if increment is true, add 1 to this._total. Otherwise, subtract 1.
      this._updateText();
    };
  
    _updateText() {
      this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
    }
  }
  
  export default TodoCounter;