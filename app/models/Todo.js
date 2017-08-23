
class Todo {

  constructor(text) {
    this.text = text;
    this.isChecked = false; // treating checked as complete for phase one
  }

  getText = () => {
     return this.text;
  }

  setText = (text) => this.text = text;

  getChecked = () => {
    return this.isChecked;
  }

  setChecked = (checked) => this.isChecked = checked;
}

export default Todo;
