import React, { useState } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import '../../sass/Todo/Todo.scss';

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

    // When there are tasks in the todoList:
    if (props.todoList.length > 0) {
        return (
            <div className='Todo'>
                <Jumbotron>
                    <h1 style={{ width: '100%', 
                        margin: '1% auto'
                    }}>Tasks:</h1>
                    {props.todoList.map(task => 
                        <Task 
                            key={task.id} 
                            toggleCompleted={props.toggleCompleted}
                            soundbites={props.soundbites}
                            task={task}
                        /> 
                    )}
                    <form onSubmit={addNewTask}>
                        <input 
                            type='text'
                            name='task'
                            placeholder='I need to...'
                            value={newTask}
                            onChange={changeHandler}
                        />
                        <Button 
                            variant='info' 
                            style={{ margin: '3%' }}
                            onClick={addNewTask}
                        >Submit</Button>
                    </form>
                    <div className='optn-btns'>
                        <Button variant='light' onClick={props.clearSelected}>Clear Selected</Button>
                        <Button variant='success' onClick={props.confirmClear}>Complete Selected</Button>
                        <Button variant='dark' onClick={props.selectAll}>Select All</Button>
                    </div>
                </Jumbotron>            
            </div>
        );
    }
    else {
        return (
            <div className='Todo'>
                <Jumbotron>
                    <h1>No current tasks!</h1>
                    <h3>You did everything!</h3>
                    <form onSubmit={addNewTask}>
                        <input 
                            type='text'
                            name='task'
                            placeholder='I need to...'
                            value={newTask}
                            onChange={changeHandler}
                        />
                        <Button 
                            variant='info' 
                            style={{ margin: '3%' }}
                            onClick={addNewTask}
                        >Submit</Button>
                    </form>
                    <div className='optn-btns'>
                        <Button variant='light' onClick={props.clearSelected}>Clear Selected</Button>
                        <Button variant='success' onClick={props.confirmClear}>Complete Selected</Button>
                        <Button variant='dark' onClick={props.selectAll}>Select All</Button>
                    </div>
                </Jumbotron>            
            </div>
        );
    }
}

export default Todo;