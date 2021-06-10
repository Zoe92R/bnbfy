import lodash from 'lodash'

export const utilService = {
    sortByRate,
    getAmount,
    makeId,
    createOrder,
    calRate,
    sortByDate
}


function sortByRate(stays) {
    const newArr = stays.map(stay => {
        stay.avgRate = calRate(stay.reviews)
        return stay
    })
    return newArr.sort((a, b) => b.avgRate - a.avgRate)
}
function sortByDate(reviews, isToSeeAll = false) {
    reviews.sort((a, b) => b.createdAt - a.createdAt)
    return (isToSeeAll) ? reviews : reviews.slice(0, 4)
}

function getAmount(lngVal, type, isFilterSearch = false) {
 
    if (type === 'guest') {
        const amount = lodash.reduce(lngVal, (acc, n) => {
            return acc + n
        });
        if (amount > 1) return (isFilterSearch) ? `${amount} ${type}` : ` · ${amount} ${type}`;
        if (amount === 1) return (isFilterSearch) ? `1 ${type}` : ` · 1 ${type}`;
        return ''
    }
    if (lngVal > 1) return `${lngVal} ${type}s`;
    if (lngVal === 1) return `1 ${type}`;
    if (!lngVal) {
        if (type === 'stay') return 'No stays to show';
        if (type === 'review') return 'New!no reviews yet...';
        return ''
    }
    return ''
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}


function createOrder(trip, user, stay,) {
    const order = {
        createdAt: Date.now(),
        buyer: user,
        totalPrice: trip.totalPrice,
        startDate: trip.startDate,
        endDate: trip.endDate,
        // guests: {
        //     adults: 2, kids: 0, infants: 0
        // },
        guests: {
            adults: trip.guest.adults ,kids: trip.guest.kids ,infants: trip.guest.infants
        },
        stay: {
            _id: stay._id,
            name: stay.name,
            price: stay.price,
            picture: stay.imgUrls[0]
        },
        hostId: "u103",
        // hostId: stay.host._id,
        status: "pending"
    }
    console.log('order in util service Id',order._id);
    console.log('order in util service',order);
    return order
}



function calRate(reviews) {
    const calAvgRate = lodash.meanBy(reviews, (review) => review.rate)
    return (Math.floor(calAvgRate) === calAvgRate) ? calAvgRate : calAvgRate.toFixed(1)
}