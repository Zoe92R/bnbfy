import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from 'react-router-dom'
import { saveOrder } from "../store/actions/orderActions"
import Swal from 'sweetalert2'
import moment from "moment"
import { utilService } from "../services/utilService"
import { BookingModal } from './StayDetailsCmps/BookingModal'

export const Footer = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { currStay } = useSelector(state => state.stayModule)
    const { trip } = useSelector(state => state.tripModule)
    const [mobile, setMobile] = useState(false)
    const [screenSize, setScreenSize] = useState(0)
    const [blackMode, setisBlackMode] = useState('')
    const [isBookingModal, setisBookingModal] = useState(false)
    const user = {
        "_id": "u1021",
        "fullname": "Nisim David",
    }

    useEffect(() => {
        console.log('innerwidth', window.innerWidth);
        setScreenSize(window.innerWidth)
    }, [])

    useEffect(() => {
        if (location.pathname.includes('details')) {
            console.log('mobile')
            setScreenSize(window.innerWidth)
            screenSize < 460 ? setMobile(true) : setMobile(false)
        } else {
            setisBookingModal(false)
            setMobile(false)
        }
        console.log('location', location.pathname.includes('details'));
    }, [mobile, location, screenSize, window.innerWidth])

    const isWhite = () => {
        return screenSize < 460 ? 'white' : ''
    }

    const isBlack = () => {
        if (blackMode) {
            console.log('blackMode', blackMode);
            return `modal-mode ${blackMode}`
        } else {
            return "modal-mode"
        }
    }

    const setIsBlack = (str) => {
        setisBlackMode(str)
    }

    const getAvgRage = () => {
        const avgRate = utilService.calRate(currStay.reviews)
        return avgRate;
    }
    const onReserve = async (tripeDetails) => {
        let timerInterval
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
        console.log('order in stay details', order);
        await saveOrder(order)
    }
    return (
        <footer className={`main-footer main-layout full ${isWhite()}`} >
            <div className={isBlack()}>
                <p>
                    BnBfy,Inc <i className="far fa-copyright">
                    </i>-All rights reserved
                    <i className="far fa-copyright"></i>
                </p>
                {mobile && <div>
                    {console.log(mobile)}
                    <div className="flex space-between">
                        <span>price: ${currStay && currStay.price}</span>
                        <button onClick={() => setisBookingModal(true)}>
                            Check Availability
                        </button>
                    </div>
                </div>}
                {isBookingModal && <div className="footer-booking-modal flex align-center justify-center">
                    <BookingModal
                        setIsBlack={setIsBlack}
                        currStay={currStay}
                        trip={trip}
                        onReserve={onReserve}
                        avgRate={getAvgRage()} />
                </div>}
            </div>
        </footer >
    )
}
