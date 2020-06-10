import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import '../sass/Navigation.scss';

//Components:
import Todo from './Todo';

// Audio imports:
import Incomplete from '../soundbites/click-incomplete.mp3';
import Done from '../soundbites/click-done.mp3';
import Completed from '../soundbites/click-completed.mp3';
import Alert from '../soundbites/click-prompt.mp3';
import clearSelected from '../soundbites/click-clear-selected.mp3';

const todo = [
    {
        id: 0,
        task: 'Walk The Dog!',
        completed: false,
        status: 'danger'
    },
    {
        id: 1,
        task: 'Do The Dishes!',
        completed: false,
        status: 'danger'
    },
    {
        id: 2,
        task: 'Get 8 Hours Sleep!',
        completed: false,
        status: 'danger'
    }
];

// Soundbites:
const clickIncomplete = new Audio(Incomplete);
const clickDone = new Audio(Done);
const clickCompleted = new Audio(Completed);
const clickAlert = new Audio(Alert);
const clickClearSelected = new Audio(clearSelected);

class Navigation extends Component {
    constructor() {
        super();
        this.state = {
            todoList: todo,
            incomplete: 'danger',
            done: 'success',
            soundbites: {
                incomplete: clickIncomplete,
                done: clickDone,
                completed: clickCompleted,
                clearSelected: clickClearSelected,
                alert: clickAlert
            }
        };
    }

    completeTasks = taskId => {
        const updatedList = this.state.todoList.map(task => {
            if (task.id === taskId) {
                switch (task.status) {
                    case 'danger':
                        return {
                            ...task,
                            completed: !task.completed,
                            status: this.state.done
                        };
                    default:
                        return {
                            ...task,
                            completed: !task.completed,
                            status: this.state.incomplete
                        };
                }
            }

            return task;
        });
        this.setState({ todoList: updatedList });
    }

    clearSelected = () => {
        this.state.soundbites.clearSelected.play();
        const updatedList = this.state.todoList.map(task => {
            if (task.status === this.state.done) {
                return {
                    ...task,
                    completed: !task.completed,
                    status: this.state.incomplete
                };
            }
            return task;
        });
        this.setState({ todoList: updatedList });
    }

    confirmClear = () => {
        this.state.soundbites.alert.play();
        const completionCheck = this.state.todoList.filter(task => task.status === this.state.done);
        if (completionCheck.length === 0) {
            window.alert('Error:  There are no completed tasks to clear!');
        }
        else {
            if (window.confirm('Are you sure you want to clear the completed tasks?  This cannot be undone!')) {
                this.state.soundbites.completed.play();
                const updatedList = this.state.todoList.filter(task => task.status === this.state.incomplete);
                this.setState({ todoList: updatedList });
            }
        }
    }

    render() {
        return (
            <div className='Navigation'>
                <Tabs defaultActiveKey='todo'>
                    <Tab eventKey='todo' title='Todo'>
                        <Todo 
                            todoList={this.state.todoList} 
                            completeTasks={this.completeTasks}
                            clearSelected={this.clearSelected}
                            confirmClear={this.confirmClear}
                            soundbites={this.state.soundbites}
                        />  
                    </Tab>
                    <Tab eventKey='board' title='Board'>
                        <h1>Board!</h1>
                    </Tab>
                    <Tab eventKey='calendar' title='Calendar'>
                        <h1>Calendar!</h1>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Navigation;