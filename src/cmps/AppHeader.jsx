import React, { useState, useEffect, createRef } from 'react';
// import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { UserMenu } from './UserMenu.jsx'
import { TripSettings } from './HomeCmps/TripSettings'
import emptyAvatar from '../assets/svg/appHeader/emptyAvatar.svg'
import hamburger from '../assets/svg/appHeader/hamburger.svg'
import logo from '../assets/img/Logo/logo-fit.png'

export const _AppHeader = (props) => {
    const [userProfileToggle, setUserProfileToggle] = useState(false)
    const [isScrol, setIsScrol] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
    });

    const toggleProfile = () => {
        setUserProfileToggle(!userProfileToggle)
    }
    const onScroll = () => {
        const pageYOffset = window.pageYOffset
        if (pageYOffset > 100) {
            setIsScrol(true)
        } else {
            setIsScrol(false)
        }
    }

    const getHeaderClass = () => {
        return (props.location.pathname !== "/" || isScrol) ? "white" : ""
    }

    const isUserAvatar = () => {
        if (props.loggedInUser) {
            return <img className="avatar-home-user" onClick={() => toggleProfile()} src={props.loggedInUser.imgUrl} />
        } else {
            return <img className="avatar-home" onClick={() => toggleProfile()} src={emptyAvatar} />
        }
    }

    return (
        <header className={`main-header main-layout full ${getHeaderClass()}`} >
            <div className="main-header-wrapper flex space-between">
                <div className="logo"><NavLink exact to="/"><img src={logo} /></NavLink></div>
                {isScrol && <div className="trip-filter ">
                    <TripSettings />
                </div>}
                <nav className="main-nav flex align-center space-between">
                    <NavLink exact to="/stay" className="clean-list"> Explore </NavLink>
                    {!props.loggedInUser && <NavLink exact to="/" className="clean-list"> Become a Host </NavLink>}
                    <div className="user-menu flex align-center">
                        <img className="hamburger-header" onClick={toggleProfile} src={hamburger} />
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