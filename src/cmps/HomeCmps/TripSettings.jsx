import { connect } from 'react-redux'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from "moment"
import search from '../../assets/svg/button/search_btn.svg'
import { loadStays } from '../../store/actions/stayActions.js'
import { updateTrip } from '../../store/actions/tripActions.js'
import { CitySearchModal } from '../HomeCmps/CitySearchModal.jsx'
import { GuestChoose } from '../HomeCmps/GuestChoose.jsx'
import { DateRangePicker } from '../commonCmps/DateRangePicker.jsx'
import { utilService } from '../../services/utilService.js'
import React from 'react'
// import { set } from 'lodash'

export class _TripSettings extends Component {
    state = {
        trip: {
            startDate: '',
            endDate: '',
            countrys: '',
            guest: {
                adults: 0,
                kids: 0,
                infants: 0
            },
        },
        isDatePickerOpen: false,
        isGuestChooseOpen: false,
        isLocationChooseOpen: false,
        mobile: false

    }
    async componentDidMount() {
        await this.props.loadStays()
    }

    handleChange = (ev) => {
        this.setState(prevState => ({
            trip: {
                ...prevState.trip,
                countrys: ev.target.value
            }
        }))
        this.onFoucesModal()
        // console.log(this.state.countrys)
    }

    onClickTxtModal = (val) => {
        this.setState((prevState => ({
            trip: {
                ...prevState.trip,
                countrys: val
            },
        })))
        this.onToggleChoose('date-picker')
    }

    getAllStays = () => {
        // const arr = this.props.stays.filter(item => {
        let citys = []
        this.props.stays.forEach(stay => {
            if (citys.includes(stay.loc.city)) return
            else citys.push(stay.loc.city)
        });
        // const arr = this.props.stays.filter(item => item.loc.city.toLowerCase()
        // .includes(this.state.trip.countrys.toLowerCase()))
        //     .map(arr => arr.loc.city)
        //     .filter((value, index, self) => self.indexOf(value) === index)
        return citys

    }

    onToggleChoose = (choose) => {
        if (choose === 'location') this.setState({
            isLocationChooseOpen: !this.state.isLocationChooseOpen,
            isDatePickerOpen: false,
            isGuestChooseOpen: false
        })
        if (choose === 'guest') this.setState({
            isGuestChooseOpen: !this.state.isGuestChooseOpen,
            isDatePickerOpen: false,
            isLocationChooseOpen: false
        })
        if (choose === 'date-picker') this.setState({
            isDatePickerOpen: !this.state.isDatePickerOpen,
            isGuestChooseOpen: false,
            isLocationChooseOpen: false
        })
    }
    onClearBtn = (ev, type) => {
        ev.stopPropagation()

        switch (type) {
            case 'txt-btn':
                ev.target.value = ''
                break
            case 'guest-btn':
                this.setState((prevState => ({
                    trip: {
                        ...prevState.trip,
                        guest: {
                            adults: 0,
                            kids: 0,
                            infants: 0
                        }
                    },
                    isGuestChooseOpen: false
                })))


                break;
            default:
                console.log('no good')

        }
    }

    guestUpdate = (guest) => {
        this.setState(prevState => ({
            trip: {
                ...prevState.trip,
                guest
            }
        }))
    }


    setDate = (startDate, endDate) => {
        this.setState(prevState => ({
            trip: {
                ...prevState.trip,
                startDate,
                endDate
            }
        }))
        if (startDate && endDate) this.onToggleChoose('guest')
    }
    onFoucesModal = () => {
        this.setState({
            isLocationChooseOpen: true,
            isDatePickerOpen: false,
            isGuestChooseOpen: false
        })
    }

    render() {
        const { trip, isGuestChooseOpen, isDatePickerOpen, isLocationChooseOpen } = this.state
        const guestAmount = utilService.getAmount(trip.guest, 'guest', true)
        const filterPlaces = this.getAllStays()
        return (
            <React.Fragment>
                <div className="filter-warper">
                    <button className="filter-warper-input-txt"
                        onClick={() => this.onToggleChoose('location')}>
                        {/* <button className="btn-clear-search" onClick={(e) => this.onClearBtn(e, 'guest-btn')}></button> */}
                        <div className="picker-date-btn-first-line">Location</div>
                        <input onClick={() => this.onFoucesModal}
                            placeholder="Where are you going?"
                            type="search"
                            // list="places"
                            value={trip.countrys}
                            onChange={this.handleChange}
                            autoComplete="off" />
                    </button>
                    {isLocationChooseOpen && filterPlaces && <CitySearchModal
                        // guestUpdate={this.guestUpdate}
                        countrys={filterPlaces}
                        onClickTxtModal={this.onClickTxtModal} />}


                    <button className="picker-date-btn"
                        onClick={() => this.onToggleChoose('date-picker')}>
                        <div className="picker-date-btn-first-line">Pick a Date</div>
                        {trip.startDate && `${moment(trip.startDate).format('LL')}`}
                        {!trip.startDate && <div>
                            <div className="picker-date-btn-sec-line">Check-in</div>
                        </div>}
                    </button>

                    <button className="picker-date-btn"
                        onClick={() => this.onToggleChoose('date-picker')}>
                        <div className="picker-date-btn-first-line">Pick a Date</div>
                        {trip.endDate && `${moment(trip.endDate).format('LL')}`}

                        {!trip.endDate && <div>
                            <div className="picker-date-btn-sec-line">Check-out</div>
                        </div>}
                    </button>
                    {/* <div className="flex" style={{ position: "absolute", zIndex: 120, fontWight: 400, top: "168px", right: "13%" }}>
                    {isDatePickerOpen && <DateRangePicker style={{ backgroundColor: 'red' }} setDate={this.setDate}
                        onToggleChoose={this.onToggleChoose} />}</div> */}

                <button className="is-guest-choose" onClick={() => this.onToggleChoose('guest')}>
                    <div className="picker-date-btn-first-line">Guests</div>
                    {guestAmount ? guestAmount : <div className="picker-date-btn-sec-line">Add guests</div>}
                </button>
                {isGuestChooseOpen && <GuestChoose
                    guestUpdate={this.guestUpdate}
                    guest={trip.guest} />}
                <Link className="search-warrper flex flex-end align-center" to={`/stay/location/${this.state.trip.countrys.split(',')[0]}`}>
                    <button className="search-btn flex justify-center" onClick={() => this.props.updateTrip(trip)}>
                        <img src={search} alt="" /></button>
                </Link>
            </div>
            <div className="flex justify-center">
            {/* <div className="flex" style={{ position: "absolute", zIndex: 120, fontWight: 400, top: "168px", right: "13%" }}> */}
                    {isDatePickerOpen && <DateRangePicker style={{ backgroundColor: 'red' }} setDate={this.setDate}
                        onToggleChoose={this.onToggleChoose} mobile={this.props.mobile}/>}</div>
                    {/* {isDatePickerOpen && <DateRangePicker style={{ backgroundColor: 'red' }} setDate={this.setDate}
                        onToggleChoose={this.onToggleChoose} mobile={false}/>}</div> */}
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        stays: state.stayModule.stays,
        currstay: state.stayModule.currstay
    }
}
const mapDispatchToProps = {
    loadStays,
    updateTrip
}

export const TripSettings = connect(mapStateToProps, mapDispatchToProps)(_TripSettings)