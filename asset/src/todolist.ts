const todoValue = document.querySelector(".todo-value") as HTMLInputElement;

const addTodo = document.querySelector(".add-todo") as HTMLButtonElement;

const clearTodos = document.querySelector(".clear-todos") as HTMLButtonElement;

const todoList = document.querySelector(".todoList") as HTMLUListElement;

interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

const handleSubmit = (event: Event) => {
  event.preventDefault();

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title: todoValue.value,
    isCompleted: false,
  };

  addTodoToDom(newTodo);

  todos.push(newTodo);
  saveTodosInLocalStorage();

  todoValue.value = "";
  todoValue.focus();
};

const addTodoToDom = (todo: Todo) => {
  todoList.insertAdjacentHTML(
    "beforeend",
    `
    <li>
    ${todo.title}<span class="icon" onClick={removeTodo("${todo.id}")}
      ><i class="fas fa-trash"></i
    ></span>
  </li>
  `
  );
};

const removeTodo = (todoId: string) => {
  todos = todos.filter((item) => item.id !== todoId);
  saveTodosInLocalStorage();
  todoList.innerHTML = "";
  todos.forEach((item) => addTodoToDom(item));
};

clearTodos.addEventListener("click", () => {
  todoList.innerHTML = "";
  todos = [];
  saveTodosInLocalStorage();
});

const saveTodosInLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
  return true;
};

addTodo.addEventListener("click", (event: Event) => {
  handleSubmit(event);
});

window.addEventListener("DOMContentLoaded", () => {
  todos.forEach((item) => addTodoToDom(item));
});
