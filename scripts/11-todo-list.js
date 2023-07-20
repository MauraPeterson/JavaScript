const todoList = [{ name: 'make dinner', dueDate: '2023-07-20'}, {name: 'wash dishes', dueDate: '2023-07-20'}];

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
  renderTodoList(todoList);
}

function renderTodoList(todoList){
  let todoListHTML = '';

  for(let i = 0; i < todoList.length; i++){
    const todoObject = todoList[i];
    const {name , dueDate} = todoObject;
    const html = `
      <div>
        ${name}
      </div>
      <div>
        ${dueDate}
      </div> 
      <button onclick="
        todoList.splice(${i}, 1);
        renderTodoList(todoList);
      "
      class="delete-button">
        Delete
      </button>
    `;
    todoListHTML += html;
  }

  const todoListElement = document.querySelector('.js-todo-list');
  todoListElement.innerHTML = todoListHTML;
  
}