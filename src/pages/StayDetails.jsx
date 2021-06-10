import React, { Component } from 'react'
import { connect } from 'react-redux'
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2'
import moment from "moment"
import { loadStay, saveStay } from '../store/actions/stayActions.js'
import { loadOrders, saveOrder } from '../store/actions/orderActions.js'
import { GoogleMap } from '../cmps/StayDetailsCmps/GoogleMap.jsx'
import { StayReviews } from '../cmps/StayDetailsCmps/StayReviews.jsx'
import { AmentiesList } from '../cmps/StayDetailsCmps/AmentiesList.jsx'
import { BookingModal } from '../cmps/StayDetailsCmps/BookingModal.jsx'
import { AddReview } from '../cmps/StayDetailsCmps/AddReview.jsx'
import { utilService } from '../services/utilService.js'

import {PageLoader} from '../cmps/commonCmps/PageLoader.jsx'

export class _StayDetails extends Component {

    state = {
        isToSeeAll: false,
        isReviewAddOpen: false,
        modalOpen: false,
        // avgRate: null,
        user: {
            "_id": "u1021",
            "fullname": "Nisim David",
            // "imgUrl": "https://randomuser.me/api/portraits/men/22.jpg"
        }
    }

    async componentDidMount() {
        const id = this.props.match.params.stayId
        await this.props.loadStay(id)
        /*console.log(this.props.currStay)*/
        await this.props.loadOrders()
        // this.setState({ avgRate: utilService.calRate(this.props.currStay.reviews) }) // bug then refrash
    }

    onSeeAll = () => {
        this.setState({ isToSeeAll: !this.state.isToSeeAll })
    }
    addReview = async (review) => {
        const copyStay = { ...this.props.currStay }
        copyStay.reviews.unshift(review)
        await this.props.saveStay(copyStay)
        // this.setState({ isToSeeAll: false })
        this.setState({ isReviewAddOpen: false })
    }

    getAvgRage = () => {
        const avgRate = utilService.calRate(this.props.currStay.reviews)
        return avgRate;

    }

    onReserve = async (tripeDetails) => {
        // Swal.fire({
        //     title: 'Thank you for your reservation!',
        //     timer: 5000,
        //    html: 

        //         `<div style="white-space: pre-line; font-family:Cereal-Normal;">${this.props.currStay.name} in ${this.props.currStay.loc.address}\n${moment(tripeDetails.startDate).format('LL')}-${moment(tripeDetails.startDate).format('LL')}\nTotal price of $${tripeDetails.totalPrice}\nCheck out your email for full details.<div>`

        //     ,
        //     icon: 'success',
        //     timerProgressBar: true,
        //     confirmButtonColor: '#FF5A5F'
        // })

        let timerInterval
        Swal.fire({
            title: 'Thank you for your reservation!',
            html:  `<div style={{white-space: pre-line; font-family:Cereal-Normal}}>${this.props.currStay.name} in ${this.props.currStay.loc.city} \n \n${moment(tripeDetails.startDate).format('LL')}-${moment(tripeDetails.endDate).format('LL')}\n\n <div>`,
            timer: 5000,
            showConfirmButton:true,
            confirmButtonColor: 'green',
            timerProgressBar: true,
        //     didOpen: () => {
        //         Swal.showLoading()
        //         timerInterval = setInterval(() => {
        //             const content = Swal.getHtmlContainer()
        //             if (content) {
        //                 const b = content.querySelector('b')
        //                 if (b) {
        //                     b.textContent = Swal.getTimerLeft()
        //                 }
        //             }
        //         }, 100)
        //     },
        //     willClose: () => {
        //         clearInterval(timerInterval)
        //     }
        // })
        })
        const { currStay } = this.props
        const order = utilService.createOrder(tripeDetails, this.state.user, currStay)
        console.log('order in stay details', order);
        await this.props.saveOrder(order)
    }

    toggleAddReview = () => {
        this.setState({ isReviewAddOpen: !this.state.isReviewAddOpen })
    }


    render() {
        const { currStay } = this.props
        if (!currStay) return <div>Loading...</div>
        return (
            <div className="stay-details">
                <div className="stay-main-details">
                    <div className="stay-title">{currStay.name}</div>
                    <div >
                        <i className="rate-star fas fa-star"></i>
                        <span className="rate-small"><span className="rate-num">{this.getAvgRage()}</span><span> ({currStay.reviews.length} reviews) </span></span>
                        <span className="address">{currStay.loc.address}</span>
                    </div>
                </div>
                <div className="details-gallery grid">
                    {currStay.imgUrls.map((currStayImg, idx) => <img key={idx} className="stay-img" src={currStayImg} />)}
                </div>
                <div className="booking-modal-details-container flex space-between">
                    <div class-name="stay-details">
                        <div className="secondary-dets">
                            <div className="dets-by-host">{`Hosted by ${currStay.host.fullname}`}</div>
                            <div>{`Up to ${currStay.capacity} Guests`}</div>
                            {/* <img className="host-img" src={currStay.host.imgUrl} /> */}
                        </div>
                        <p>{currStay.summary}</p>
                        <div className="aments">
                            <div className="amenities-title">Amenities</div>
                            <AmentiesList aments={currStay.amenities} />
                        </div>
                    </div>
                    <BookingModal currStay={currStay} trip={this.props.trip} onReserve={this.onReserve} avgRate={this.getAvgRage()} />
                </div>
                <div>
                    <i className="rate-star fas fa-star"></i>
                    <span className="reviwes-header"> {this.getAvgRage()} ({currStay.reviews.length} reviews)</span>
                </div>
                <StayReviews reviews={currStay.reviews} isToSeeAll={this.state.isToSeeAll} />
                <div className="btns-review flex space-between">
                    <button className="btn-toggle-review" onClick={() => this.onSeeAll()}>{(!this.state.isToSeeAll) ? 'See all Reviews' : 'hide'}</button>
                    {!this.state.isReviewAddOpen && <button className="btn-add-review-dets" onClick={() => this.toggleAddReview()}>Add Review</button>}
                </div>
                {this.state.isReviewAddOpen && <AddReview currStay={currStay} user={this.state.user} addReview={this.addReview} />}
                <GoogleMap loc={currStay.loc} />
            </div>

        )
    }
}


function mapStateToProps(state) {
    return {
        currStay: state.stayModule.currStay,
        trip: state.tripModule.trip,
        orders: state.orderModule.orders,
        // users: state.usersModule.users
    }
}

const mapDispatchToProps = {
    loadStay,
    saveStay,
    loadOrders,
    saveOrder
}

export const StayDetails = connect(mapStateToProps, mapDispatchToProps)(_StayDetails)