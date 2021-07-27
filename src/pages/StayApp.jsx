import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../services/utilService'
import { StayList } from '../cmps/ExploreCmps/StayList.jsx'
import { StayFilter } from '../cmps/ExploreCmps/StayFilter.jsx'
import { loadStay, loadStays } from '../store/actions/stayActions.js'
import { updateTrip } from '../store/actions/tripActions.js'
import { PageLoader } from '../cmps/commonCmps/PageLoader.jsx'
import moment from "moment"

export class _StayApp extends Component {
    state = {
        isPriceFilterOpen: false,
        filteredStays: []
    }
    async componentDidMount() {
        await this.props.loadStays()
        const city = this.props.match.params.city
        if (city) {
            this.setState({ filteredStays: this.getFilterStays(city) })
            // update trip location fron the real url
            // if (!this.props.trip) {

            //     updateTrip(trip)
            // }
        } else {
            this.setState({ filteredStays: this.props.stays })
        }
    }

    getFilterStays = (city) => {
        const { stays } = this.props
        return stays.filter(stay => {
            return stay.loc.city === city
        })
    }

    priceFilterModalToggle = () => {
        this.setState({
            isPriceFilterOpen: !this.state.isPriceFilterOpen
        })
    }


    render() {
        const { stays, trip } = this.props
        const { filteredStays } = this.state
        if (filteredStays.length === 0) return <PageLoader />
        const guestsAmount = (trip) ? (trip.guest) ? utilService.getAmount(trip.guest, 'guest') : '' : ''
        const stayLength = utilService.getAmount(filteredStays.length, 'stay')
        const tripDate = (trip) ? (trip.startDate && trip.endDate) ? ` · ${moment(trip.startDate).format('MMM-DD')}-${moment(trip.endDate).format('MMM-DD')}` : '' : ''
        const dynamicHeadline = (!this.props.match.params.city) ? `Top-rated places to stay` : `Stays in ${this.props.match.params.city}`
        const { isPriceFilterOpen } = this.state
        return (
            <section className="main-explore main-layout full">
                <div className="main-explore-wrapper">

                    <div className="explore-headline">
                        <p className="explore-headline-criteria">{`${stayLength}${tripDate}${guestsAmount}`}</p>
                        <h2>{dynamicHeadline}</h2>
                        <div className="explore-filter-btn">
                            <button onClick={this.priceFilterModalToggle}>Price</button>
                        </div>
                    </div>
                    {isPriceFilterOpen && <StayFilter />}
                    <StayList stays={filteredStays} />
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