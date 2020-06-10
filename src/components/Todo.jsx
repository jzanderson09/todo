import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import '../sass/Todo.scss';

// Components:
import Task from './Task';



const Todo = props => {
    return (
        <div className='Todo'>
            <Jumbotron>
                {props.todoList.map(task => <Task key={task.id} completeTasks={props.completeTasks} task={task} /> )}
                <div className='optn-btns'>
                    <Button variant='light'>Clear Selected</Button>
                    <Button variant='success'>Complete Selected</Button>
                </div>
            </Jumbotron>            
        </div>
    );
}

export default Todo;