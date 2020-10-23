import React, { Component } from 'react';
import axios from 'axios';
import { Tabs, Tab } from 'react-bootstrap';
import '../sass/TodoList.scss';

//Components:
import Todo from './Todo/Todo';

// Audio imports:
import Incomplete from '../soundbites/click-incomplete.mp3';
import Done from '../soundbites/click-done.mp3';
import Completed from '../soundbites/click-completed.mp3';
import Alert from '../soundbites/click-prompt.mp3';
import clearSelected from '../soundbites/click-clear-selected.mp3';
import newTask from '../soundbites/add-task.mp3';
import selectAll from '../soundbites/click-select-all.mp3';
import errorSound from '../soundbites/error.mp3';

class Navigation extends Component {
    constructor() {
        super();
        this.state = {
            todoList: [],
            incomplete: 'danger',
            done: 'success',
            soundbites: {
                incomplete: new Audio(Incomplete),
                completed: new Audio(Done),
                done: new Audio(Completed),
                clearSelected: new Audio(clearSelected),
                alert: new Audio(Alert),
                addTask: new Audio(newTask),
                selectAll: new Audio(selectAll),
                error: new Audio(errorSound)
            },
            allSelected: false
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:8000/tasks')
            .then(res => this.setState({ todoList: res.data }))
            .catch(err => console.log(err));
    }

    // Marks tasks as completed and changes button style:
    toggleCompleted = (id, task) => {
        console.log(task);
        console.log(id);
        axios
            .put(`http://localhost:8000/tasks/:${id}`, task)
            .then(res => this.setState({ todoList: res.data }))
            .catch(err => console.log(err));
        console.log(this.state.todoList[id]);
    }

    // Upon confirmation from user, clears completed tasks:
    confirmClear = () => {
        this.state.soundbites.alert.play();
        const completionCheck = this.state.todoList.filter(task => task.status === this.state.done);
        if (completionCheck.length === 0) {
            window.alert('Error:  There are no completed tasks to clear!');
        }
        else if (completionCheck.length === 1) {
            if (window.confirm(`Are you sure you want to clear the task '${completionCheck[0].task}' ?`)) {
                this.state.soundbites.completed.play();
                axios
                    .del('http://localhost:8000/tasks')
                    .then(res => this.setState({ todoList: res.data }))
                    .catch(err => console.log(err));
            }
        }
        else {
            if (window.confirm('Are you sure you want to clear the completed tasks?  This cannot be undone!')) {
                this.state.soundbites.completed.play();
                const updatedList = this.state.todoList.filter(task => task.status === this.state.incomplete);
                this.setState({ todoList: updatedList });
            }
        }
    }

    // Adds task to the todoList:
    addTask = task => {
        if (task.length > 0) {
            this.state.soundbites.addTask.play();
            // Creates the task object ready to be pushed to the DB:
            const taskObj = {
                task: `${task}!`,
                completed: false,
                status: this.state.incomplete
            };
            axios
                .post('http://localhost:8000/tasks', taskObj)
                .then(res => this.setState({ todoList: res.data }))
                .catch(err => console.log(err));
        }
        else {
            this.state.soundbites.error.play();
            window.alert('Error:  Cannot submit an empty task!  Ya gotta DO something, man!');
        }
    }

    // Selects all tasks as ready for completion:
    selectAll = () => {

    }

    render() {
        return (
            <div className='Navigation'>
                <Tabs defaultActiveKey='todo'>
                    <Tab eventKey='todo' title='Todo'>
                        <Todo
                            addTask={this.addTask}
                            toggleCompleted={this.toggleCompleted}
                            confirmClear={this.confirmClear}
                            selectAll={this.selectAll}
                            soundbites={this.state.soundbites}
                            todoList={this.state.todoList}
                        />  
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Navigation;