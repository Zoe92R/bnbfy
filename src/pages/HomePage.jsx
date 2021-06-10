import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadStays, loadStay } from '../store/actions/stayActions'
import { TripSettings } from '../cmps/HomeCmps/TripSettings'
import { PopularPlaces } from '../cmps/HomeCmps/PopularPlaces'
import { TopRated } from '../cmps/HomeCmps/TopRated'
import portugal from '../assets/img/popular/portugal.jpg'
import spain from '../assets/img/popular/spain.jpg'
import Madrid from '../assets/img/popular/Madrid.jpg'
import TelAviv from '../assets/img/popular/TelAviv.jpg'
import Paris from '../assets/img/popular/Paris.jpg'
import NewYork from '../assets/img/popular/newYork.jpg'
//pics from:"https://www.freestock.com/free-photos/church-village-frias-burgos-spain-1513100516"
//"https://www.freestock.com/free-photos/lisbon-portugal-1080089420"
//Image used under license from Freestock.com
class _HomePage extends Component {
    state = {
        popular: [{
            name: 'New York',
            pic: NewYork
        }, {
            name: 'Madrid',
            pic: Madrid
        },
        {
            name: 'Tel Aviv',
            pic: TelAviv
        },
        {
            name: 'Paris',
            pic: Paris
        }
        ]
        ,
    }
    async componentDidMount() {
        await this.props.loadStays()
    }

    render() {
        console.log('this.props.isLoading :', this.props.isLoading )
        return (
            
            <div className="main-homepage">
               <React.Fragment>
                <div className="trip-filter ">
                    <TripSettings />
                </div>
                <div className="hero-text">Come, stay and enjoy your day<span>.</span></div>
                <div className="hero-sector">
                    <div className="hero-image">
                    </div>
                </div>
                <div className="main-homepage-wrapper">
                    <div className="popular-places">
                        <h2 className="popular-places-headline" >Popular Places</h2>
                        <PopularPlaces popularLoc={this.state.popular} />
                    </div>
                    <div className="see-all flex flex-end">
                        <Link className="see-all clean-list" to='/stay'>See All</Link>
                    </div>
                    <div className="top-rated">
                        <h2>Top Rated Stays</h2>
                        <TopRated stays={this.props.stays} topRatedIds={this.state.topRatedIds} />
                    </div>
                    <div className="see-all flex flex-end">
                        <Link className="see-all clean-list" to='/stay'>See All</Link>
                    </div>
                </div>
                <div className="home-banner">
                    <div className="content-banner">
                        <h2>"Home is where your story begins."</h2>
                        <h5>-Annie Danielson</h5>
                        <Link className="clean-list" to="/stay"> <button>Let's go! <i className="far fa-hand-point-left"></i></button></Link>
                        <div className="content-banner-2"><h4>"And all you need is a passport!"</h4></div>
                    </div>
                </div>
                </React.Fragment>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        stays: state.stayModule.stays,
        currstay: state.stayModule.currstay,
        isLoading: state.systemModule.isLoading
    }
}
const mapDispatchToProps = {
    loadStays,
    loadStay
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)