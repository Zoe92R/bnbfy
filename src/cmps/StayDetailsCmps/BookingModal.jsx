import React, { Component } from 'react'
import { DateRangePickerDetails } from '../../cmps/StayDetailsCmps/DateRangePickerDetails.jsx'
import { BookingSummery } from '../../cmps/StayDetailsCmps/BookingSummery.jsx'
import { GuestChooseDetails } from '../../cmps/StayDetailsCmps/GuestChooseDetails.jsx'
import moment from "moment"


export class BookingModal extends Component {

    state = {
        isDatePickerOpen: false,
        isDatesPicked: false,
        startDate: '',
        endDate: '',
        totalPrice: null,
        daysNum: null,
        guest: {
            adults: 0,
            kids: 0,
            infants: 0
        },
        isGuestChoose: false,
        isReserved: false
    }

    componentDidMount() {
        const { trip } = this.props
        if (trip) {
            if (trip.startDate && trip.startDate) {
                this.setState({ startDate: trip.startDate, endDate: trip.endDate, isDatesPicked: true }, () => this.setDate(this.state.startDate, this.state.endDate))
            }
            if (trip.guest.adults > 0) {
                this.setState({ guest: trip.guest })
            }
        }
    }

    setDate = (startDate, endDate) => {
        var a = moment(startDate);
        var b = moment(endDate);
        const diff = Math.round(moment.duration(b.diff(a)).asDays()); // Difference in number of days
        this.setState({
            isDatesPicked: true,
            startDate,
            endDate,
            daysNum: diff,
            totalPrice: diff * this.props.currStay.price
        })
    }

    toggleChoose = () => {
        this.setState({ isGuestChoose: !this.state.isGuestChoose })
    }
    guestUpdate = (guest) => {
        this.setState(prevState => ({
            guest: { ...prevState.guest, guest },
            isDatePickerOpen: false
        }))
    }

    openDatePicker = () => {
        this.setState({ isDatePickerOpen: !this.state.isDatePickerOpen, isGuestChoose: false })
    }

    onReserve = () => {
        let { totalPrice, startDate, endDate, guest } = this.state
        console.log('startDate endDate', startDate, endDate)
        startDate = moment(startDate).format('YYYY/MM/DD')
        endDate = moment(endDate).format('YYYY/MM/DD')
        const checkInDets = {
            totalPrice,
            startDate,
            endDate,
            guest
        }
        this.setState({isReserved : true})
        this.props.onReserve(checkInDets)
    }

    buttonRender = () => {
        if (this.state.isReserved) return <div className="btn-reserved">Reserved!</div>
        else if (this.state.isDatesPicked) return <button className="call-action btn-grad" onClick={this.onReserve}>Reserve</button>
        else return <button className="call-action btn-grad" onClick={this.openDatePicker}>Check Availability</button>
    }

    guestAmountCulc = () => {
        const { guest } = this.state
        const amount = guest.adults + guest.kids + guest.infants
        return (amount === 0) ? '' : (amount === 1) ? '1 guest' : `${amount} guests`
    }

    render() {
        const { startDate, endDate, isDatePickerOpen, totalPrice, isGuestChoose, guest, daysNum } = this.state
        const guestAmount = this.guestAmountCulc()
        return (
            <div className="booking-modal flex column">
                <div className="flex column">
                    <div className="booking-details-header flex space-between">
                        <div className="price-night"><span className="bold-price">{`$${this.props.currStay.price}`}</span> / night</div>
                        <div className="">
                            <i className="rate-star fas fa-star"></i>
                            <span className="rate-small"><span className="rate-num">{this.props.avgRate}</span><span> ({this.props.currStay.reviews.length} reviews)</span></span>
                        </div>
                    </div>
                    <div>
                        <div className="checkIn-guest flex row">
                            <div className="dates-pick">
                                <button className="check-1" onClick={() => this.openDatePicker()}>
                                    {startDate ? `${moment(startDate).format('LL')}` : 'Check In'}</button>
                                <button className="check-2" onClick={() => this.openDatePicker()}>
                                    {endDate ? `${moment(endDate).format('LL')}` : 'Check Out'}</button>
                            </div>
                            {/* <button className="dets-guest-choose" onClick={() => this.toggleChoose()}>Guests</button> */}
                            <button className="dets-guest-choose" onClick={() => this.toggleChoose()}><div className="picker-date-btn-first-line">Guests</div>
                                {guestAmount ? guestAmount : <div className="picker-date-btn-sec-line">Add guests</div>}</button>
                        </div>
                    </div>
                </div>
                {
                    isGuestChoose && <GuestChooseDetails
                        toggleChoose={this.toggleChoose} guestUpdate={this.guestUpdate} guest={guest} />
                }
                <div className="date-picker-details">
                    {isDatePickerOpen && <DateRangePickerDetails setDate={this.setDate} openDatePicker={this.openDatePicker} />}
                </div>
                {/* { !isDatePickerOpen && this.buttonRender()} */}
                {this.buttonRender()}
                {
                    this.state.isDatesPicked &&
                    <BookingSummery startDate={moment(startDate).format('LL')} endDate={moment(endDate).format('LL')} totalPrice={totalPrice} price={this.props.currStay.price} daysNum={daysNum} />
                }
                <div className="form"></div>
            </div >
        )
    }
}



