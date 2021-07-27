import React, { useState, useEffect, createRef } from 'react';
// import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { UserMenu } from './UserMenu.jsx'
import { TripSettings } from './HomeCmps/TripSettings'
import emptyAvatar from '../assets/svg/appHeader/emptyAvatar.svg'
import hamburger from '../assets/svg/appHeader/hamburger.svg'
import logo from '../assets/img/Logo/logo-fit.png'
import search from '../assets/svg/button/search_btn.svg'


export const _AppHeaderHome = (props) => {

    const [userProfileToggle, setUserProfileToggle] = useState(false)
    const [isScrol, setIsScrol] = useState(false)
    const [isFullFilter, setIsFullFilter] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => {
            // console.log('removed')
            window.removeEventListener('scroll', onScroll)
        }
    });

    const toggleProfile = () => {
        setUserProfileToggle(!userProfileToggle)
    }
    const onScroll = () => {
        const pageYOffset = window.pageYOffset
        if (pageYOffset > 40) {
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

    const renderFilter = () => {
        // console.log('clicked for render trip setting');
        setIsFullFilter(true)
    }

    return (
        <header className={`main-home-header main-layout full ${getHeaderClass()}`} >
            <div className="tow-rows flex column">
                <div className="first-row main-header-wrapper flex space-between">

                    {/* <div className="logo item"><NavLink exact to="/"><img src={logo} /></NavLink></div> */}
                    <NavLink className="logo item" exact to="/"><img src={logo} /></NavLink>
                    {isScrol && !isFullFilter &&
                        <div className="top-filter item flex align-center space-between">
                            <button className="start-search flex space-between" onClick={renderFilter}>
                                <div className="text">Start Your Search</div>
                                <div className="search-btn flex">
                                    <img src={search} alt="" /></div>
                            </button>
                        </div>}
                    <nav className="main-nav item flex align-center space-between">
                        <NavLink exact to="/stay" className="clean-list"> Explore </NavLink>
                        {!props.loggedInUser &&
                            <NavLink exact to="/" className="clean-list"> Become a Host </NavLink>}

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


                {isScrol && isFullFilter &&
                    // <div className="bgc-header-trip">
                    <div className="trip-filter for-header second-row">
                        <TripSettings />
                    </div>
                    // </div>
                }
            </div>
        </header >
    )


}
export const AppHeaderHome = withRouter(_AppHeaderHome)