 let todos = [];
 document.addEventListener('DOMContentLoaded', async() => {
        const data=await fetch('http://localhost:3000',{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const result = await data.json();
        console.log(result);
        result.map((item) => {
            todos.push({ ID: item.ID, text: item.demo_list, editing:false
        });
        return todos;
      });
      renderTodos();
    });
    function renderTodos() {
      const list = document.getElementById('todo-list');
      list.innerHTML = '';
      todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.editing) {
          li.innerHTML = `
            <input class="form-control edit-input"  type="text" value="${todo.text}" id="edit-input-${index}" onkeyup="updateTodo(event, ${index})" />
            <div class="todo-actions">
              <button class="btn btn-success btn-sm" onclick="saveTodo(${todo.ID},document.getElementById('edit-input-${index}').value)">Save</button>
            </div>
          `;
        } else {
          li.innerHTML = `
            <span>${todo.text}</span>
            <div class="todo-actions">
              <button class="btn btn-sm btn-warning" onclick="editTodo(${index})">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deleteTodo(${todo.ID})">Delete</button>
            </div>
          `;
        }
        list.appendChild(li);
      });
    }

    async function addTodo() {
        const input = document.getElementById('todo-input');
        const text = input.value;
        console.log(text);
        await fetch('http://localhost:3000/sample', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ text })
        })
    }

    function deleteTodo(ID) {
      console.log(ID);
      fetch('http://localhost:3000/todo-delete', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ Id: ID }) })
    }

    function editTodo(index) {
      todos[index].editing = true;
      renderTodos();
    }

    function saveTodo(ID,demo_list) {
      console.log(ID, demo_list);
      fetch('http://localhost:3000/todo-update', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ Id: ID, text: demo_list})
      })
      renderTodos();
    }
