import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { UserMenu } from './UserMenu.jsx'
import emptyAvatar from '../assets/svg/appHeader/emptyAvatar.svg'
import hamburger from '../assets/svg/appHeader/hamburger.svg'
import logo from '../assets/img/Logo/logo-fit.png'

class _AppHeader extends Component {
    state = {
        userProfileToggle: false,
        headerClass: ""
    }

    toggleProfile = () => {
        this.setState({ userProfileToggle: !this.state.userProfileToggle })
    }

    getHeaderClass = () => {
        return this.props.location.pathname !== "/" ? "white main-header main-layout full" : "main-header main-layout full"
    }

    isUserAvatar = () => {
        if (this.props.loggedInUser) {
            return <img className="avatar-home-user" onClick={() => this.toggleProfile()} src="https://randomuser.me/api/portraits/women/40.jpg" />
        } else {
            return <img className="avatar-home" onClick={() => this.toggleProfile()} src="https://res.cloudinary.com/daqn5x9jq/image/upload/v1622931073/image%20airbnb/u1023.jpg" />
        }
    }

    render() {
        return (
            <header className={this.getHeaderClass()} >
                <div className="main-header-wrapper flex space-between">
                    <div className="logo"><NavLink exact to="/"><img src={logo} /></NavLink></div>
                    <nav className="main-nav flex align-center space-between">
                        <NavLink exact to="/stay" className="clean-list"> Explore </NavLink>
                        <NavLink exact to="/" className="clean-list"> Become a Host </NavLink>
                        <div className="user-menu flex align-center">
                            <img className="hamburger-header" onClick={() => this.toggleProfile()} src={hamburger} />
                            {this.isUserAvatar()}
                            {this.state.userProfileToggle && <UserMenu
                                loggedInUser={this.props.loggedInUser}
                                logout={this.props.logout}
                                toggleProfile={this.toggleProfile} />}
                            {/* <div className="user-menu flex align-center">
                        <NavLink exact to="/user/Order" className="clean-list"><i class="fas fa-bars"></i>
                            <img className="avatar-home" src="https://randomuser.me/api/portraits/men/14.jpg" /></NavLink> */}
                        </div>
                    </nav>
                </div>
            </header >
        )
    }
}

export const AppHeader = withRouter(_AppHeader)