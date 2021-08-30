import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../services/utilService'
import { StayList } from '../cmps/ExploreCmps/StayList.jsx'
import { StayFilter } from '../cmps/ExploreCmps/StayFilter.jsx'
import { loadStays } from '../store/actions/stayActions.js'
import { updateTrip } from '../store/actions/tripActions.js'
import { PageLoader } from '../cmps/commonCmps/PageLoader.jsx'
import moment from "moment"

export class _StayApp extends Component {
    state = {
        isPriceFilterOpen: false,
        // filteredStays: [],
    }
    async componentDidMount() {
        const city = this.props.match.params.city
        if (city) {
            let filterBy = { city: city }
            await this.props.loadStays(filterBy)
            // console.log('this.props.stays', this.props.stays);
            // this.setState({ filteredStays: this.getFilterStaysByCity() })
            // update trip location fron the real url
            // if (!this.props.trip) {

            //     updateTrip(trip)
            // }
        } else {
            await this.props.loadStays()
            this.setState({ filteredStays: this.props.stays })
        }
    }

    // getFilterStaysByCity = (city) => {
    //     const { stays } = this.props
    //     return stays.filter(stay => {
    //         return stay.loc.city === city
    //     })
    // }

    getCity = () => {
        return this.props.match.params.city
    }

    priceFilterModalToggle = () => {
        this.setState({
            isPriceFilterOpen: !this.state.isPriceFilterOpen
        })
    }
    filterToggleClass = () => {
        if (this.state.isPriceFilterOpen) {
            return 'btn-toggle open'
        } else {
            return 'btn-toggle'
        }
    }
    getGuestsAmount = (trip) => {
        if (trip) {
            if (trip.guest) {
                return utilService.getAmount(trip.guest, 'guest')
            } else return ''
        } else return ''
    }
    getTripDate = (trip) => {
        if (trip) {
            const start = moment(trip.startDate).format('MMM-DD')
            const end = moment(trip.endDate).format('MMM-DD')
            if (trip.startDate && trip.endDate) {
                return ` · ${start}-${end}`
            } else return ''
        } else return ''
    }
    getdynamicHeadline = () => {
        if (this.props.match.params.city) {
            return `Stays in ${this.props.match.params.city}`
        } else {
            return `Top-rated places to stay`
        }
    }

    render() {
        // console.log('props',this.props);
        window.scrollTo(0, 0)
        const { trip } = this.props
        const { stays } = this.props
        // if (stays.length === 0) return <PageLoader />
        const guestsAmount = this.getGuestsAmount(trip)
        const stayLength = utilService.getAmount(stays.length, 'stay')
        const tripDate = this.getTripDate(trip)
        const dynamicHeadline = this.getdynamicHeadline()
        const { isPriceFilterOpen } = this.state
        return (
            <section className="main-explore main-layout full">
                <div className="main-explore-wrapper">

                    <div className="explore-headline">
                        <p className="explore-headline-criteria">
                            {`${stayLength}${tripDate}${guestsAmount}`}
                        </p>
                        <h2>{dynamicHeadline}</h2>
                        <div className="explore-filter-btn">
                            <button className={this.filterToggleClass()}
                                onClick={this.priceFilterModalToggle}>
                                Price
                            </button>
                        </div>
                    </div>
                    {isPriceFilterOpen && <StayFilter
                        priceFilterModalToggle={this.priceFilterModalToggle}
                        loadStays={this.props.loadStays}
                        getCity={this.getCity} />}
                    <StayList stays={stays} />
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays,
        trip: state.tripModule.trip,
        isLoading: state.systemModule.isLoading

    }
}

const mapDispatchToProps = {
    updateTrip,
    loadStays

}

export const StayApp = connect(mapStateToProps, mapDispatchToProps)(_StayApp)