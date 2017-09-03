import uuid from 'uuid';

class TodoDate {

  constructor(todoDate) {
    this.id = uuid.v1();
    this.day = todoDate.day;
    this.date = todoDate.date;
    this.month = todoDate.month;
  }

  getId = () => {
     return this.id;
  }

  getDay = () => {
     return this.day;
  }

  setDay = (day) => this.day = day;

  getDate = () => {
    return this.date;
  }

  setDate = (date) => this.date = date;

  getMonth = () => {
    return this.month;
  }

  setMonth = (month) => this.month = month;
}

export default TodoDate;
