import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { NavLink, useLocation } from 'react-router-dom'
import { saveOrder } from "../store/actions/orderActions"
// import { NavLink, withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import moment from "moment"
import { utilService } from "../services/utilService"
import { BookingModal } from './StayDetailsCmps/BookingModal'

export const Footer = () => {
    // const dispatch = useDispatch()
    const location = useLocation()
    const { currStay } = useSelector(state => state.stayModule)
    const { trip } = useSelector(state => state.tripModule)
    const [mobile, setMobile] = useState(false)
    const [screenSize, setScreenSize] = useState(0)
    const [isBookingModal, setIsBookingModal] = useState(false)
    const [reserved, setReserved] = useState(false)
    const [isNav, setIsNav] = useState(true)
    const user = {
        "_id": "u1021",
        "fullname": "Nisim David",
    }

    useEffect(() => {
        // console.log('innerwidth', window.innerWidth);
        setScreenSize(window.innerWidth)
    }, [])

    useEffect(() => {
        if (location.pathname.includes('details')) {
            setScreenSize(window.innerWidth)
            setIsNav(false)
            screenSize < 460 ? setMobile(true) : setMobile(false)
        } else {
            setIsBookingModal(false)
            setMobile(false)
            setIsNav(true)
        }
        return () => {
            setIsBookingModal(false)
            setMobile(false)
            setReserved(false)
        }
        // console.log('location', location.pathname.includes('details'));
    }, [mobile, location, screenSize])

    const isWhite = () => {
        return screenSize < 460 ? 'white' : ''
    }

    const getAvgRage = () => {
        const avgRate = utilService.calRate(currStay.reviews)
        return avgRate;
    }
    const onReserve = async (tripeDetails) => {
        // let timerInterval
        Swal.fire({
            title: 'Thank you for your reservation!',
            html: `<div style={{white-space: pre-line; font-family:Cereal-Normal}}>
            ${currStay.name} in ${currStay.loc.city} \n \n
            ${moment(tripeDetails.startDate).format('LL')}-
            ${moment(tripeDetails.endDate).format('LL')}\n\n 
            <div>`,
            timer: 5000,
            showConfirmButton: true,
            confirmButtonColor: 'green',
            timerProgressBar: true,
        })
        const order = utilService.createOrder(tripeDetails, user, currStay)
        // console.log('order in stay details', order);
        await saveOrder(order)
        setReserved(true)
    }
    return (
        <footer className={`main-footer main-layout full ${isWhite()}`} >
            {mobile && <div>
                <div className="flex space-between">
                    <span>price: ${currStay && currStay.price}</span>
                    <button
                        className={`${reserved ? 'reserved' : 'btn-grad'}`}
                        onClick={() => setIsBookingModal(!isBookingModal)}>
                        {reserved ? 'reserved' : 'Check Availability'}
                    </button>
                </div>
            </div>}
            {isNav && mobile && < div className="footer-nav flex ">
                <NavLink exact to="/stay" className="clean-list"> Explore </NavLink> &nbsp;
                <NavLink exact to="/" className="clean-list"> Become a Host </NavLink>
            </div>}
            {
                isBookingModal && <div className="main-layout 
                footer-booking-modal flex
                align-center justify-center"
                >
                    <BookingModal
                        reserved={setReserved}
                        currStay={currStay}
                        trip={trip}
                        onReserve={onReserve}
                        avgRate={getAvgRage()}
                    />
                </div>
            }
            {/* {!isBookingModal && mobile && <div className="">
                 <NavLink exact to="/stay" className="clean-list"> Explore </NavLink>
                </div>} */}
            <p>
                BnBfy,Inc <i className="far fa-copyright">
                </i>-All rights reserved
                <i className="far fa-copyright"></i>
            </p>
        </footer >
    )
}
