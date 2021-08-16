import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from 'react-router-dom'
import { saveOrder } from "../store/actions/orderActions"
import { NavLink, withRouter } from 'react-router-dom'
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
    const [blackMode, setBlackMode] = useState('')
    const [isBookingModal, setisBookingModal] = useState(false)
    const [reserved, setReserved] = useState(false)
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
            // console.log('mobile')
            setScreenSize(window.innerWidth)
            screenSize < 720 ? setMobile(true) : setMobile(false)
        } else {
            setisBookingModal(false)
            setMobile(false)
        }
        return () => {
            // console.log('cleanup booking modal');
            setisBookingModal(false)
            setMobile(false)
        }
    }, [mobile, location, screenSize])

    // useEffect(() => {
    //     setBlackMode('')
    //     console.log('clicked');
    //     setisBookingModal(false)
    // }, [blackMode])


    const isWhite = () => {
        return screenSize < 720 ? 'white' : ''
    }

    const isBlackClass = () => {
        if (blackMode) {
            return `modal-mode ${blackMode}`
        } else {
            return "modal-mode"
        }
    }

    const setIsBlack = (str) => {
        setBlackMode(str)
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
                <div className={isBlackClass()} >
                    {mobile && <div>
                        {console.log(mobile)}
                        <div className="flex space-between">
                            <span>price: ${currStay && currStay.price}</span>
                            <button className={`${reserved ? 'reserved' : 'btn-grad'}`} onClick={() => setisBookingModal(!isBookingModal)}>
                                {reserved ? 'reserved' : 'Check Availability'}
                            </button>
                        </div>
                    </div>}
                                {isBookingModal && <div className="main-layout footer-booking-modal flex align-center justify-center">
                <BookingModal
                    currStay={currStay}
                    trip={trip}
                    setIsBlack={setIsBlack}
                    onReserve={onReserve}
                    avgRate={getAvgRage()} />
            </div>}
                    {/* {!isBookingModal && mobile && <div className="">
                 <NavLink exact to="/stay" className="clean-list"> Explore </NavLink>
                </div>} */}
                    <p>
                        BnBfy,Inc <i className="far fa-copyright">
                        </i>-All rights reserved
                        <i className="far fa-copyright"></i>
                    </p>
                </div>
            </footer >
    )
}
