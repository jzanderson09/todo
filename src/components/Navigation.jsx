import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import '../sass/Navigation.scss';

//Components:
import Todo from './Todo';

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
            done: 'success'
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

    render() {
        return (
            <div className='Navigation'>
                <Tabs defaultActiveKey='todo'>
                    <Tab eventKey='todo' title='Todo'>
                        <Todo todoList={this.state.todoList} completeTasks={this.completeTasks} />  
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