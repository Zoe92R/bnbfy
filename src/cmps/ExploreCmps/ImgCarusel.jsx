import React from 'react';
import { NavLink } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'

export function ImgCarusel({ stayId, imgs }) {



    return (
        <Carousel autoPlay={false}

            indicatorIconButtonProps={{
                style: {
                    fontSize: '8px',
                    // padding: '2px',    // 1
                    // color: '#bdbdc9',       // 3
                    color: 'gainsboro',
                }
            }}
            activeIndicatorIconButtonProps={{
                style: {
                    // backgroundColor: '#c6c6d1', // 2
                    fontSize: '8px',
                    color: 'c6c6d1',
                    margin: '0px',
                    color: 'whitesmoke',
                }
            }}
            indicatorContainerProps={{
                style: {
                    marginTop: '-35px', // 5
                    // zIndex: -1,
                    textAlign: 'center', // 4
                    backgroundColor: 'transparent'
                }

            }}
            
            // className={{



                
            // }}
            // CarouselItem={{
            //     style: {
            //         borderRadius: '30px'
            //     }
            // }}
            
            // Carousel-root-1={{
            //     style: {
            //         borderRadius: '30px'
            //     }
            // }}

            // animation={'slide'}

            timeout={220}
        >
            {
                imgs.map((img, index) =>
                    <NavLink key={index} to={`/stay/details/${stayId}`}>
                        <img key={index} style={{borderRadius: '12px'}} src={img} />
                    </NavLink>
                )
            }
        </ Carousel >
    )
}


            // function Item(props)
// {
//     return (
//         <Paper>
//             <h2>{'head'}</h2>
//             <p>{'beatuiful place'}</p>

//             <Button className="CheckButton">
//                 Check it out!
//             </Button>
//         </Paper>
//     )
// }



/// buckup

// import React from 'react';
// import Carousel from 'react-material-ui-carousel'

// export function ImgCarusel({ imgs }) {


//     return (
//         <Carousel autoPlay={false}
//             indicatorIconButtonProps={{
//                 style: {
//                     // padding: '0px',    // 1
//                     color: '#bdbdc9'       // 3
//                 }
//             }}
//             activeIndicatorIconButtonProps={{
//                 style: {
//                     // backgroundColor: '#c6c6d1', // 2
//                     color: 'c6c6d1',
//                     margin:'20px',
//                 }
//             }}
//             indicatorContainerProps={{
//                 style: {
//                     marginTop: '-50px', // 5
//                     textAlign: 'center' // 4
//                 }

//             }}
//         >
//             {
//                 imgs.map((img, i) => <img key={i} src={img} />)
//             }
//         </Carousel>
//     )
// }


// // function Item(props)
// // {
// //     return (
// //         <Paper>
// //             <h2>{'head'}</h2>
// //             <p>{'beatuiful place'}</p>

// //             <Button className="CheckButton">
// //                 Check it out!
// //             </Button>
// //         </Paper>
// //     )
// // }