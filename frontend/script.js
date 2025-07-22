

    document.addEventListener('DOMContentLoaded', async() => {
        const data=await fetch('http://localhost:3000',{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const result = await data.json();
        console.log(result);
    });

    let todos = [];
    function renderTodos() {
      const list = document.getElementById('todo-list');
      list.innerHTML = '';
      todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.editing) {
          li.innerHTML = `
            <input class="form-control edit-input" type="text" value="${todo.text}" onkeyup="updateTodo(event, ${index})" />
            <div class="todo-actions">
              <button class="btn btn-success btn-sm" onclick="saveTodo(${index})">Save</button>
            </div>
          `;
        } else {
          li.innerHTML = `
            <span>${todo.text}</span>
            <div class="todo-actions">
              <button class="btn btn-sm btn-warning" onclick="editTodo(${index})">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deleteTodo(${index})">Delete</button>
            </div>
          `;
        }
        list.appendChild(li);
      });
    }

    function addTodo() {
        const input = document.getElementById('todo-input');
        const text = input.value;
        console.log(text);
        fetch('http://localhost:3000/sample', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ text })
        })
    }

    function deleteTodo(index) {
    }

    function editTodo(index) {
      todos[index].editing = true;
      renderTodos();
    }

    function saveTodo(index) {
      renderTodos();
    }