
class Todo {

  constructor(text) {
    this.text = text;
    this.type = 'active'; // types: active, completed; default state: active
    this.isChecked = false; // treating checked as complete for phase one
  }

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
