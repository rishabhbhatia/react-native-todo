import TodoDate from '../models/TodoDate';

const generateDates = () => {

  let dates = [];
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  let dayIndex = 0;

  for(let i =1; i<30; i++) {

    var dateObj = {
      day: days[dayIndex],
      date: i,
      month: 'JULY'
    }

    dayIndex++;

    if(dayIndex == 7) dayIndex = 0;

    let todoDate = new TodoDate(dateObj);
    dates.push(todoDate);
  }

  return dates;
}

export default generateDates;
