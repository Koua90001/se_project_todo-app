class FormValidator {
    constructor(settings, formEl) {
      this._formEl = formEl;
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._errorClass = settings.errorClass;
      this._inputErrorClass = settings.inputErrorClass;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._buttonElement = this._formEl.querySelector(
        this._submitButtonSelector
      );
    }
  
    disableSubmitButton() {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  
    resetValidation() {
      this._formEl.reset();
      this.disableSubmitButton();
    }
  
    _showInputError(inputElement) {
      const errorElementId = `#${inputElement.id}-error`;
      const errorElement = this._formEl.querySelector(errorElementId);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass);
    }
  
    _hideInputError(inputElement) {
      const errorElementId = `#${inputElement.id}-error`;
      const errorElement = this._formEl.querySelector(errorElementId);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
    }
  
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }
  
    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this.disableSubmitButton();
      } else {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
      }
    }
  
    _setEventListeners() {
      this._inputList = Array.from(
        this._formEl.querySelectorAll(this._inputSelector)
      );
      this._toggleButtonState(this._inputList);
  
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(this._inputList);
        });
      });
    }
  
    enableValidation() {
      this._formEl.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    }
  }
  
  export default FormValidator;