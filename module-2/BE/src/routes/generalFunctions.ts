import tasks from '../DB/tasks.json';


export  function sayHello() {
  return 'Hello';
}

export function getTasks() {
  return tasks.tasks
}
