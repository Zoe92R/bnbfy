import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadOrders, setOrderStatus,saveOrder } from '../store/actions/orderActions.js'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from "moment"
// import { Dashboard } from '../cmps/Dashboard.jsx'
import { orderService } from '../services/orderService.js';
import { ListItemText } from '@material-ui/core';


class _Orders extends Component {
    state = {
        afterOrderStatus: false,
        hostOrders: [],
        hostAvatar: '',
        hostName: '',
    }

    async componentDidMount() {
        await this.props.loadOrders()
        const hostOrders = await orderService.getOrderByHost('u103')
        console.log('host orders',hostOrders);
        const { hostAvatar, hostName } = hostOrders[0]
        this.setState({ hostOrders, hostAvatar, hostName })
        if (!this.props.loggedInUser) this.props.history.push('/login')
    }

    getGuests = (order) => {
        const { guests } = order
        return Object.values(guests).reduce((a, b) => a + b)
    }

    getNights = (order) => {
        // console.log('order.createdAt', order.createdAt);
        let a = moment(order.startDate)
        let b = moment(order.endDate)
        const diff = Math.round(moment.duration(b.diff(a)).asDays())
        return diff
    }
    orderStatus = (order) => {
        if (order.status === 'accepted') {
            return <i className="fas fa-check-circle"></i>
        } else if (order.status === 'rejected') {
            return <i className="fas fa-times-circle"></i>
        } else {
            return <div>
                <button className="btn-accept" onClick={() => this.orderStatusToSave(order, 'accepted')}><i className="far fa-calendar-check"></i></button>
                <button className="btn-reject" onClick={() => this.orderStatusToSave(order, 'rejected')}><i className="far fa-calendar-times"></i></button>
            </div>
        }
    }

    orderStatusToSave = (order, orderStatus) => {
        order.status = orderStatus
        this.props.setOrderStatus(order)
        this.props.saveOrder(order)
        this.setState({ afterOrderStatus: !this.state.afterOrderStatus })
    }

    reservationTime = (order) => {
        // const time = order.createdAt
        // console.log('time', time)
        const returnTime = moment(order.createdAt).format("DD MMM YYYY")
        // console.log('order.createdAt', returnTime)
        return returnTime
    }


    // rowColor = (order) => {
    //     if (order.status === 'pending') return 'pink'
    //     // return 'grey'
    // }


    render() {

        const { orders } = this.props
        const { hostAvatar, hostOrders, hostName } = this.state
        // console.log('orders in order page',orders);
        if (!orders || orders.length === 0) return <div>LOADING...</div>
        return (
            <React.Fragment>
                {/* <div>charts</div> */}
                <div className="order-table-pic flex column">

                    <div className="user-pic flex column ">
                        {/* <Dashboard orders={orders} /> */}
                        <img src={hostAvatar} />
                        <span className="user-name flex">{hostName}</span>
                    </div>
                    <div className="profile-table flex justify-center align-center">

                        <TableContainer component={Paper}>
                            <Table aria-label="simple table" style={{ minWidth: '650px'}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ padding: '10px', align: "left" }} >Reservation Date</TableCell>
                                        <TableCell style={{ padding: '10px', align: "left" }}>Stay</TableCell>
                                        <TableCell style={{ padding: '10px', align: "left" }}>Stay Name</TableCell>
                                        <TableCell style={{ padding: '10px', align: "left" }}>Booker</TableCell>
                                        <TableCell style={{ padding: '10px', align: "left" }}>Trip Date</TableCell>
                                        <TableCell style={{ padding: '10px', textAlign: "center" }}>Nights</TableCell>
                                        <TableCell style={{ padding: '10px', textAlign: "center" }}>Guests</TableCell>
                                        <TableCell style={{ padding: '10px', textAlign: "center" }} >Amount</TableCell>
                                        <TableCell style={{ padding: '10px', textAlign: "center" }} >Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {hostOrders.map((order) => (

                                        < TableRow key={order._id}>
                                            <TableCell component="th" scope="row">{this.reservationTime(order)}</TableCell>
                                            <TableCell align="left" ><img src={order.stay.picture} /></TableCell>
                                            <TableCell align="left">{order.stay.name}</TableCell>
                                            <TableCell align="left">{order.buyer.fullname}</TableCell>
                                            <TableCell align="left">{order.startDate} - {order.endDate}</TableCell>
                                            <TableCell align="center">{this.getNights(order)}</TableCell>
                                            <TableCell align="center">{this.getGuests(order)}</TableCell>
                                            <TableCell align="center">${order.totalPrice}</TableCell>
                                            <TableCell align="center">{this.orderStatus(order)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orderModule.orders,
        // users: state.userModule.users,
        loggedInUser: state.userModule.loggedInUser,
    }
}
const mapDispatchToProps = {
    loadOrders,
    setOrderStatus,
    saveOrder
}

export const Orders = connect(mapStateToProps, mapDispatchToProps)(_Orders)