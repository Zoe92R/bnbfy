import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import subDays from "date-fns/subDays"

export class DateRangePicker extends Component {

    state = {
        date: null,
        startDate: null,
        endDate: null,
    }


    setDateRange = (dates) => {
        const [start, end] = dates;

        this.setState({
            startDate:
                start, endDate: end
        })
        if (start && end) this.props.onToggleChoose('date-picker')
        this.props.setDate(start, end)
    }

    render() {
        const { startDate, endDate } = this.state;
        return (
            <div>
                <DatePicker
                    selected={null}
                    onChange={(update) => {
                        this.setDateRange(update);
                    }}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange={true}
                    minDate={new Date()}
                    monthsShown={2}
                    inline={true}
                    shouldCloseOnSelect={true}
                />
            </div>
        )
    }
}

