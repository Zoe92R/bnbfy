import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
    const [pageYOffset, setPpageYOffset] = useState(0)
    const [isFullFilter, setIsFullFilter] = useState(false)
    const [isNarrow, setIsNarrow] = useState(false)
    const { loggedInUser } = useSelector(state => state.userModule)

    useEffect(() => {
        if (window.innerWidth < 720) setIsNarrow(true)
        window.addEventListener('scroll', onScroll, { capture: true })
        return () => {
            window.removeEventListener('scroll', onScroll, { capture: true })
        }
    }, []);

    useEffect(() => {
        setIsFullFilter(false)
        return () => {
            
        }
    }, [pageYOffset])

    const toggleProfile = () => {
        setUserProfileToggle(!userProfileToggle)
    }
    const onScroll = () => {
        const pageYOffset = window.pageYOffset
        setPpageYOffset(pageYOffset)
        if (pageYOffset > 80) {
            setIsScrol(true)
        } else {
            setIsScrol(false)
            // setPpageYOffset(0)
        }
    }

    const getHeaderClass = () => {
        return (props.location.pathname !== "/" || isScrol) ? "white" : ""
    }

    const isUserAvatar = () => {
        if (loggedInUser) {
            return <img className="avatar-home-user"
                onClick={() => toggleProfile()}
                src={loggedInUser.imgUrl} alt="" />
        } else {
            return <img className="avatar-home"
                onClick={() => toggleProfile()}
                src={emptyAvatar} alt="" />
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

                    <NavLink className="logo item" exact to="/"><img src={logo} alt="" /></NavLink>
                    {isScrol && !isFullFilter && !isNarrow && <div className="top-filter item flex align-center space-between">
                        <button className="start-search flex space-between" onClick={renderFilter}>
                            <div className="text">Start Your Search</div>
                            <div className="search-btn flex">
                                <img src={search} alt="" /></div>
                        </button>
                    </div>}
                    {/* {isScrol && isMobile && } */}
                    <nav className="main-nav item flex align-center space-between">
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


                {isScrol && (isFullFilter || isNarrow) &&
                    <div className="trip-filter for-header second-row">
                        <TripSettings />
                    </div>
                }
            </div>
        </header >
    )


}
export const AppHeaderHome = withRouter(_AppHeaderHome)