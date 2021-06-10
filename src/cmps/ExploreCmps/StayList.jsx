import { StayPreview } from './StayPreview.jsx'
import { utilService } from '../../services/utilService.js'





export function StayList({ stays }) {
    const sortedRateStay = utilService.sortByRate(stays,stays.length)
    // console.log('sortedRateStay:', sortedRateStay)
    return (
        <div className="stay-list grid">
            {sortedRateStay.map(stay =>
                <StayPreview
                    key={stay._id}
                    stay={stay}
                />)}
        </div>
    )
}
