import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import subDays from "date-fns/subDays"
// console.log('subDays:', subDays)

export class DateRangePicker extends Component {

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
                    inline
                />
            </div>
        )
    }
}
//     const [startDate, setStartDate] = useState(new Date("2014/02/08"));
//     const [endDate, setEndDate] = useState(new Date("2014/02/10"));
//     return (
//       <>
//         <DatePicker
//           selected={startDate}
//           onChange={(date) => setStartDate(date)}
//           selectsStart
//           startDate={startDate}
//           endDate={endDate}
//         />
//         <DatePicker
//           selected={endDate}
//           onChange={(date) => setEndDate(date)}
//           selectsEnd
//           startDate={startDate}
//           endDate={endDate}
//           minDate={startDate}
//         />
//       </>
//     );
//   };
// }