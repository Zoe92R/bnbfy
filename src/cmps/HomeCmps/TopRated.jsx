
import { utilService } from '../../services/utilService.js'
import { StayPreview } from '../ExploreCmps/StayPreview.jsx'
import { PageLoader } from '../commonCmps/PageLoader.jsx'

export function TopRated({ stays }) {
    let sortedRateStay = utilService.sortByRate(stays, 4)
    if (!stays || !sortedRateStay) return <PageLoader />
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

