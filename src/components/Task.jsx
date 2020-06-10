import React from 'react';
import Button from 'react-bootstrap/Button';
import '../sass/Task.scss';

const Task = ({ completeTasks, task }) => {

    return (
        <div className='Task'>
            <Button 
                variant={task.status} 
                onClick={() => completeTasks(task.id)}
                >{task.task}</Button>
        </div>
    );
};

export default Task;