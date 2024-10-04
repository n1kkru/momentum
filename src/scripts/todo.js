// Темплейт todo
const todoTemplate = document.querySelector('#todo-template').content;

// Функция создания todo
function createTodo(title, handlerDelete) {
  const todoElem = todoTemplate.querySelector('.todo').cloneNode(true);
  
  const todoDeleteButton = todoElem.querySelector('.todo__delete-button');
  const todoCheckbox = todoElem.querySelector('.todo__checkbox');

  todoElem.querySelector('.todo__title').textContent = title;

  todoDeleteButton.addEventListener('click', () => {
    handlerDelete(todoElem);
  }); 

  todoCheckbox.addEventListener('click', (evt) => {});

  return todoElem;
}

function deleteElement(elem) {  
  elem.remove();
};

export {createTodo, deleteElement};
