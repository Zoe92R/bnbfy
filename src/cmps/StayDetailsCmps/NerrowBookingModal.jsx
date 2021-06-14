import React, { Component } from 'react'

export class NerrowBookingModal extends Component {


    buttonRender = () => {
        if (this.state.isReserved) return <div className="btn-reserved">Reserved!</div>
        else if (this.state.isDatesPicked) return <button className="call-action btn-grad" onClick={this.onReserve}>Reserve</button>
        else return <button className="call-action btn-grad" onClick={this.openDatePicker}>Check Availability</button>
    }

    render () {
        return (
            <div className="nerrow-footer-booking">
                <div>Nerroe footer</div>
                <div>{this.buttonRender()}</div>
            </div>

        )

      
    }
}
