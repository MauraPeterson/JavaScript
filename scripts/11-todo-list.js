const todoList = ['make dinner', 'wash dishes'];

renderTodoList(todoList);

function addTodo(){
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  todoList.push(name);

  inputElement.value = '';
  renderTodoList(todoList);
}

function renderTodoList(todoList){
  let todoListHTML = '';
  for(let i = 0; i < todoList.length; i++){
    const todo = todoList[i];
    const html = `<p>${todo}</p>`;
    todoListHTML += html;
  }

  const todoListElement = document.querySelector('.js-todo-list');
  todoListElement.innerHTML = todoListHTML;
  
}