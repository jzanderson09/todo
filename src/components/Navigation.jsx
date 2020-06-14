import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import '../sass/Todo/Navigation.scss';

//Components:
import Todo from './Todo/Todo';
import Calendar from './Calendar/Calendar';

// Audio imports:
import Incomplete from '../soundbites/click-incomplete.mp3';
import Done from '../soundbites/click-done.mp3';
import Completed from '../soundbites/click-completed.mp3';
import Alert from '../soundbites/click-prompt.mp3';
import clearSelected from '../soundbites/click-clear-selected.mp3';
import newTask from '../soundbites/add-task.mp3';
import selectAll from '../soundbites/click-select-all.mp3';
import errorSound from '../soundbites/error.mp3';

const todo = [
    {
        id: Date.now(),
        task: 'Walk The Dog!',
        completed: false,
        status: 'danger'
    },
    {
        id: Date.now() + 1,
        task: 'Do The Dishes!',
        completed: false,
        status: 'danger'
    },
    {
        id: Date.now() + 3,
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
                error: new Audio(errorSound)
            },
            allSelected: false
        };
    }

    // Marks tasks as completed and changes button style:
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

    // Clears any selected tasks, ready for completion:
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

    // Adds task to the todoList:
    addTask = task => {
        this.state.soundbites.addTask.play();
        console.log();
        const taskObj = {
            id: Date.now(),
            task: `${task}!`,
            completed: false,
            status: this.state.incomplete
        };
        const updatedList = [...this.state.todoList, taskObj];
        this.setState({ todoList: updatedList });
    }

    // Selects all tasks as ready for completion:
    selectAll = () => {
        const selectionCheck = this.state.todoList.filter(task => task.completed && task.status === this.state.done);
        if (selectionCheck.length > 0) {
            this.state.soundbites.clearSelected.play();
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
                            selectAll={this.selectAll}
                            soundbites={this.state.soundbites}
                            todoList={this.state.todoList}
                        />  
                    </Tab>
                    {/* <Tab eventKey='board' title='Board'>
                        <h1>Board!</h1>
                    </Tab>
                    <Tab eventKey='calendar' title='Calendar'>
                        <Calendar />
                    </Tab> */}
                </Tabs>
            </div>
        );
    }
}

export default Navigation;