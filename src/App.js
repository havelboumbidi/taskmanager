import React, { useState,useEffect } from 'react';
import {Button,InputGroup,Form,Card} from 'react-bootstrap';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons';
function App() {
  const [tasks, setTasks] = useState( JSON.parse(localStorage.getItem('tasks')));
  const [taskInput, setTaskInput] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
 
  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = {
        text: taskInput,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };
 
  const removeTask = (index) => {
    console.log('Removing task at index:', index);
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const completeTask =(index)=>{
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  }

  return (
    <div className="App">
      <div className="centered-container">
        <div className="expandable-div">
          <h3>Get Things Done!</h3>
          <br/>
          <div>
            <InputGroup className="mb-3" size='sm'>
              <Form.Control
                placeholder="What is your task?"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                className="custom-input"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              />
              <Button variant="outline-secondary" id="button-addon2" className='custom-button' onClick={addTask}>
                Add Task
              </Button>
            </InputGroup>
          </div>
            {tasks.map((task, index) => (
             
             <div className='taskDesign'  key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
               <span  onClick={()=>completeTask(index)} style={{padding:'10px',cursor:'pointer',textDecoration: task.completed ? 'line-through' : 'none'}}>  {task.text}</span>
               <div style={{padding:'10px',cursor:'pointer'}} onClick={() => removeTask(index)}><FontAwesomeIcon icon={faTrash} style={{color:'#ccc'}}/></div>
             </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
