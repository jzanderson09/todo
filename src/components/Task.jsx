import React from 'react';
import Button from 'react-bootstrap/Button';
import '../sass/Task.scss';


const Task = ({ completeTasks, soundbites, task }) => {

    const clickButton = () => {
        if (task.status === 'danger') {
            soundbites.done.play();
        }
        else {
            soundbites.incomplete.play();
        }
        completeTasks(task.id);
    }

    return (
        <div className='Task'>
            <Button 
                variant={task.status} 
                onClick={clickButton}
                >{task.task}</Button>
        </div>
    );
};

export default Task;