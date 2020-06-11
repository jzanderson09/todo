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
import newTask from '../soundbites/add-task.mp3';
import selectAll from '../soundbites/click-select-all.mp3';
import deselectAll from '../soundbites/click-deselect.mp3';
import errorSound from '../soundbites/error.mp3';

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

class Navigation extends Component {
    constructor() {
        super();
        this.state = {
            todoList: todo,
            incomplete: 'danger',
            done: 'success',
            soundbites: {
                incomplete: new Audio(Incomplete),
                done: new Audio(Done),
                completed: new Audio(Completed),
                clearSelected: new Audio(clearSelected),
                alert: new Audio(Alert),
                addTask: new Audio(newTask),
                selectAll: new Audio(selectAll),
                deselectAll: new Audio(deselectAll),
                error: new Audio(errorSound)
            },
            allSelected: false
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
        const selectionCheck = this.state.todoList.filter(task => task.completed);
        if (selectionCheck.length > 0) {
            this.state.soundbites.clearSelected.play();
            const updatedList = this.state.todoList.map(task => {
                if (task.status === this.state.done) {
                    return {
                        ...task,
                        completed: false,
                        status: this.state.incomplete
                    };
                }
                return task;
            });
            this.setState({ todoList: updatedList, allSelected: false });
        }
        else {
            this.state.soundbites.error.play();
        }
    }

    confirmClear = () => {
        this.state.soundbites.alert.play();
        const completionCheck = this.state.todoList.filter(task => task.status === this.state.done);
        if (completionCheck.length === 0) {
            window.alert('Error:  There are no completed tasks to clear!');
        }
        else if (completionCheck.length === 1) {
            if (window.confirm(`Are you sure you want to clear the task '${completionCheck[0].task}' ?`)) {
                this.state.soundbites.completed.play();
                const updatedList = this.state.todoList.filter(task => task.status === this.state.incomplete);
                this.setState({ todoList: updatedList });
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

    addTask = task => {
        this.state.soundbites.addTask.play();
        console.log();
        const taskObj = {
            id: this.state.todoList.length,
            task: `${task}!`,
            completed: false,
            status: this.state.incomplete
        };
        const updatedList = [...this.state.todoList, taskObj];
        this.setState({ todoList: updatedList });
    }

    selectAll = () => {
        if (this.state.allSelected) {
            this.state.soundbites.deselectAll.play();
            const cleared = this.state.todoList.map(taskObj => {
              return {
                ...taskObj,
                completed: false,
                status: this.state.incomplete
              }
            });
            this.setState({ todoList: cleared, allSelected: false });
          }
          else {
            this.state.soundbites.selectAll.play();
            const selected = this.state.todoList.map(taskObj => {
              return {
                ...taskObj,
                completed: true,
                status: this.state.done
              };
            });
            this.setState({ todoList: selected, allSelected: true });
          }
    }

    render() {
        return (
            <div className='Navigation'>
                <Tabs defaultActiveKey='todo'>
                    <Tab eventKey='todo' title='Todo'>
                        <Todo
                            addTask={this.addTask}
                            clearSelected={this.clearSelected}
                            completeTasks={this.completeTasks}
                            confirmClear={this.confirmClear}
                            soundbites={this.state.soundbites}
                            selectAll={this.selectAll}
                            todoList={this.state.todoList}
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