import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import '../../sass/Todo/Task.scss';


const Task = (props) => {
    const incomplete = 'danger';
    const complete = 'success';

    const [status, setStatus] = useState(incomplete);

    const clickButton = () => {

        const { id } = props.task;
        
        if (status === incomplete) {
            const updatedTask = {
                id: id,
                task: props.task.task,
                completed: !props.task.completed
            };
            props.toggleCompleted(id, updatedTask);
            setStatus(complete);
            props.soundbites.completed.play();
        }
        else {
            const updatedTask = {
                id: id,
                task: props.task.task,
                completed: !props.task.completed
            }
            props.toggleCompleted(id, updatedTask);
            setStatus(incomplete);
            props.soundbites.incomplete.play();
        }
    }

    return (
        <div className='Task'>
            <Button 
                variant={status} 
                onClick={clickButton}
                ><p>{props.task.task}</p></Button>
        </div>
    );
};

export default Task;