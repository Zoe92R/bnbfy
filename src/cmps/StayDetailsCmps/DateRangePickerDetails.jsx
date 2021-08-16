import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import subDays from "date-fns/subDays"
// console.log('subDays:', subDays)

export class DateRangePickerDetails extends Component {

    state = {
        date: null,
        startDate: null,
        endDate: null,
    }


    setDateRange = (dates) => {
        const [start, end] = dates;
        // console.log('start:', start)

        this.setState({
            startDate:
                start, endDate: end
        })
        // if (start && end) this.props.onToggleChoose('date-picker')
        if (start && end) this.props.openDatePicker()
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
                />
            </div>
        )
    }
}
