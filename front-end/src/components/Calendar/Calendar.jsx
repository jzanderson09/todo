import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            startDate: new Date()
        }
    }

    handleChange = date => {
        this.setState({
        startDate: date
        });
    };
    
    render() {
        return (
            <div className='Calendar'>
                <DatePicker
                    dateFormat="Pp"
                    onChange={this.handleChange}
                    selected={this.state.startDate}
                    shouldCloseOnSelect={false}
                    showTimeInput={true}
                    timeIntervals={1}
                />
                <DatePicker 
                    disabled={true}
                    selected={this.state.startDate}
                />
            </div>
        );
    }
}

export default Calendar;