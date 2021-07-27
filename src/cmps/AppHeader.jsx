import React, { useState, useEffect, createRef } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
// import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { UserMenu } from './UserMenu.jsx'
import { TripSettings } from './HomeCmps/TripSettings'
import emptyAvatar from '../assets/svg/appHeader/emptyAvatar.svg'
import hamburger from '../assets/svg/appHeader/hamburger.svg'
import logo from '../assets/img/Logo/logo-fit.png'





export const _AppHeader = (props) => {

    const [userProfileToggle, setUserProfileToggle] = useState(false)
    const history = useHistory();
    const { city } = useParams()
    const { trip } = useSelector(state => state.tripModule)




    const toggleProfile = () => {
        setUserProfileToggle(!userProfileToggle)
    }


    const getHeaderClass = () => {
        return (props.location.pathname !== "/") ? "white" : "no-display"
    }

    const isUserAvatar = () => {
        if (props.loggedInUser) {
            return <img className="avatar-home-user" onClick={() => toggleProfile()} src={props.loggedInUser.imgUrl} alt="" />
        } else {
            return <img className="avatar-home" onClick={() => toggleProfile()} src={emptyAvatar} alt="" />
        }
    }

    const goBack = () => {
        if (!trip) history.push('/')
        else if (history.location.pathname.includes("details")) {
            console.log('in details');
            history.push(`/stay/location/${trip.countrys}`)
        }
        else history.push('/')
    }


    return (
        <header className={`main-header main-layout full ${getHeaderClass()}`} >
            <div className="main-header-wrapper flex space-between">
                <i className="fas fa-chevron-left go-back" onClick={goBack}></i>
                <div className="logo"><NavLink exact to="/"><img src={logo} alt="" /></NavLink></div>
                <nav className="main-nav flex align-center space-between">
                    <NavLink exact to="/stay" className="clean-list"> Explore </NavLink>
                    {!props.loggedInUser &&
                        <NavLink exact to="/" className="clean-list"> Become a Host </NavLink>}
                    <div className="user-menu flex align-center">
                        <img className="hamburger-header" onClick={toggleProfile} src={hamburger} alt="" />
                        {isUserAvatar()}
                        {userProfileToggle && <UserMenu
                            loggedInUser={props.loggedInUser}
                            logout={props.logout}
                            toggleProfile={toggleProfile} />}
                    </div>
                </nav>
            </div>
        </header >
    )


}
export const AppHeader = withRouter(_AppHeader)