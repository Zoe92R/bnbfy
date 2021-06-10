import {StayApp} from './pages/StayApp.jsx'
import {StayDetails} from './pages/StayDetails.jsx'
import {StayEdit} from './pages/StayEdit.jsx'
import {HomePage} from './pages/HomePage.jsx'
import {Orders} from './pages/Orders.jsx'
import {LoginSignup} from './pages/LoginSignup.jsx'
// import {LoginSignup} from './pages/LoginSignup.jsx'

export const routes = [
    {
        path: '/stay/edit/:stayId?',
        component: StayEdit
    },
    {
        path: '/stay/details/:stayId',
        component: StayDetails
    },
    {
        path:'/stay/:city',
        component: StayApp
    },
    {
        path:'/stay',
        component: StayApp
    },
    {
        path:'/',
        component: HomePage
    },
    {
        path: '/user/order',
        component: Orders
    },
    {
        path: '/login',
        component: LoginSignup
    }

]
