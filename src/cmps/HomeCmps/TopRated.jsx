
import { utilService } from '../../services/utilService.js'
import { StayPreview } from '../ExploreCmps/StayPreview.jsx'

export function TopRated({ stays }) {
    let sortedRateStay = utilService.sortByRate(stays, 4)
    return (
        <div className="stay-list grid">
            {sortedRateStay.slice(0, 4).map(stay =>
                <StayPreview
                    stay={stay}
                    key={stay._id}
                />)}
        </div>
    )

}

