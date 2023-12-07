const todoValue = document.querySelector(".todo-value");
const addTodo = document.querySelector(".add-todo");
const clearTodos = document.querySelector(".clear-todos");
const todoList = document.querySelector(".todoList");
let todos = JSON.parse(localStorage.getItem("todos") || "[]");
const handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
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
const addTodoToDom = (todo) => {
    todoList.insertAdjacentHTML("beforeend", `
    <li>
    ${todo.title}<span class="icon" onClick={removeTodo("${todo.id}")}
      ><i class="fas fa-trash"></i
    ></span>
  </li>
  `);
};
const removeTodo = (todoId) => {
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
addTodo.addEventListener("click", (event) => {
    handleSubmit(event);
});
window.addEventListener("DOMContentLoaded", () => {
    todos.forEach((item) => addTodoToDom(item));
});
//# sourceMappingURL=todolist.js.map