import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import '../sass/Todo.scss';

// Components:
import Task from './Task';

const Todo = props => {
    return (
        <div className='Todo'>
            <Jumbotron>
                <h1 
                    style={{ width: '100%', 
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
                    <Button variant='success' onClick={props.confirmClear}>Complete Selected</Button>
                </div>
            </Jumbotron>            
        </div>
    );
}

export default Todo;