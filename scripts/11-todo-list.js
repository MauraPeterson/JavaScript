
const todoList = JSON.parse(localStorage.getItem('todo')) || '';

renderTodoList(todoList);

function addTodo(){
  const inputNameElement = document.querySelector('.js-name-input');
  const name = inputNameElement.value;

  const inputDateElement = document.querySelector('.js-date-input');
  const dueDate = inputDateElement.value;

  const object = {
    name,
    dueDate
  }

  todoList.push(object);

  inputNameElement.value = '';
  localStorage.setItem('todo', JSON.stringify(todoList));
  renderTodoList(todoList);
}

function removeTodo(i){
  todoList.splice(i, 1);
  localStorage.setItem('todo', JSON.stringify(todoList));
  renderTodoList(todoList);
}


function renderTodoList(todoList){
  let todoListHTML = '';

  todoList.forEach(function(todoObject, index){
    const {name , dueDate} = todoObject;
    const html = `
      <div>
        ${name}
      </div>
      <div>
        ${dueDate}
      </div> 
      <button onclick="
        removeTodo(${index});
      "
      class="delete-button">
        Delete
      </button>
    `;
  todoListHTML += html;
  });
    const todoListElement = document.querySelector('.js-todo-list');
    todoListElement.innerHTML = todoListHTML;
  }