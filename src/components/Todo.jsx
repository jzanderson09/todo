import React, { useState } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import '../sass/Todo.scss';

// Components:
import Task from './Task';

const Todo = props => {
    const [newTask, setNewTask] = useState('');

    const changeHandler = e => {
        setNewTask(e.target.value);
    };

    const addNewTask = e => {
        e.preventDefault();
        props.addTask(newTask);
        setNewTask('');
    };

    return (
        <div className='Todo'>
            <Jumbotron>
                <h1 style={{ width: '100%', 
                    margin: '1% auto'
                }}>Tasks:</h1>
                {props.todoList.map(task => 
                    <Task 
                        key={task.id} 
                        completeTasks={props.completeTasks}
                        soundbites={props.soundbites}
                        task={task}
                    /> 
                )}
                <div className='optn-btns'>
                    <Button variant='light' onClick={props.clearSelected}>Clear Selected</Button>
                    <form onSubmit={addNewTask}>
                        <input 
                            type='text'
                            name='task'
                            placeholder='I need to...'
                            value={newTask}
                            onChange={changeHandler}
                        />
                        <Button variant='info' style={{ margin: '3%' }}>Submit</Button>
                    </form>
                    <Button variant='success' onClick={props.confirmClear}>Complete Selected</Button>
                    <Button variant='dark' onClick={props.selectAll}>Select All</Button>
                </div>
            </Jumbotron>            
        </div>
    );
}

export default Todo;