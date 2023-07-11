import React, { useState,useEffect } from 'react';
import {v4 as uuid} from 'uuid';
import './index.css';

const getTodos=()=>{
    const storedTodos = localStorage.getItem('todos');
    
    if (storedTodos) {
      return JSON.parse(localStorage.getItem('todos'))
    }else{
        return []
    }
}
const TodoApp = () => {
  const [todos, addTodos] = useState(getTodos());
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
 

  const formSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: uuid(),
      text: inputValue,
      completed: false,
    };

    addTodos([...todos, newTodo]);
    setInputValue('');
  };

  const todoToggle = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    addTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    addTodos(updatedTodos);
  };
  
  return (
    <div className="todo-app">
      <h1>Todo App</h1>

      <form onSubmit={formSubmit}>
        <input className='input'
          type="text"
          placeholder="Enter a new todo..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className='submitButton' type="submit">Add Todo</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <div>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => todoToggle(todo.id)}
            />
            <span>{todo.text}</span>
            </div>
            <button className='delete' onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;