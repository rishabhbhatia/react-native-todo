
class Todo {

  constructor(todo) {
    this.id = (typeof todo.id !== 'undefined') ?  todo.id : new Date().getTime();
    this.text = todo.text;
    this.type = 'active'; // types: active, completed; default state: active
    this.isChecked = false; // treating checked as complete for phase one
  }

  getId = () => {
     return this.id;
  }

  setId = (id) => this.id = id;

  getText = () => {
     return this.text;
  }

  setText = (text) => this.text = text;

  getType = () => {
    return this.type;
  }

  setType = (type) => this.type = type;

  getChecked = () => {
    return this.isChecked;
  }

  setChecked = (checked) => this.isChecked = checked;
}

export default Todo;
