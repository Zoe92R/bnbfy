import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'

// export function ImgCarusel({ stayId, imgs }) {
export class ImgCarusel extends Component {


    render() {


        return (
            <Carousel autoPlay={false}

                indicatorIconButtonProps={{
                    style: {
                        fontSize: '8px',
                        color: 'gainsboro',
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        fontSize: '8px',
                        // color: 'c6c6d1',
                        margin: '0px',
                        color: 'whitesmoke',
                    }
                }}
                indicatorContainerProps={{
                    style: {
                        marginTop: '-35px', // 5
                        textAlign: 'center', // 4
                        backgroundColor: 'transparent'
                    }

                }}



                timeout={150}
            >
                {
                    this.props.imgs.map((img, index) =>
                        <NavLink key={img} to={`/stay/details/${this.props.stayId}`}>
                            <img key={img} style={{ borderRadius: '12px' }} src={img} alt=""/>
                        </NavLink>
                    )
                }
            </ Carousel >
        )
    }
}


