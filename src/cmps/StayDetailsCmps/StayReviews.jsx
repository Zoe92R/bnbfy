import { utilService } from '../../services/utilService.js'
import { Rating } from '@material-ui/lab'


import moment from "moment"
export function StayReviews({ reviews, isToSeeAll }) {

    const sortedReviews = utilService.sortByDate(reviews, isToSeeAll)
    return (
        <div >
            <ul className="reviews-list grid">
                {sortedReviews.map(review =>
                    <li key={review.id} className="clean-list review">
                        <div className="user-info flex space-between">
                            <div>
                                <div className="flex">
                                    <img className="user-img flex" src={`https://res.cloudinary.com/daqn5x9jq/image/upload/v1622931073/image%20airbnb/${review.by._id}.jpg`} />
                                    <div>
                                        <div className="user-name">{review.by.fullname}</div>
                                        <div className="date">{moment(review.createdAt).format('MMMM YYYY')}</div>
                                    </div>
                                </div>
                            </div>
                            <Rating name="read-only" value={review.rate} readOnly />
                        </div>
                        <p>{review.txt}</p></li>)}
            </ul >
        </div>
    )
}