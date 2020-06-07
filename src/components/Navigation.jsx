import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import '../sass/Navigation.scss';

const Navigation = () => {
    return (
        <div className='Navigation'>
            <Tabs defaultActiveKey='todo'>
                <Tab eventKey='todo' title='Todo'>
                    <h1>Todo!</h1>  
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
};

export default Navigation;