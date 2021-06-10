
import { utilService } from '../../services/utilService.js'
import {StayPreview} from '../ExploreCmps/StayPreview.jsx'
// import { Card } from '@material-ui/core'
// import { Link } from 'react-router-dom'

export function TopRated({ stays }) {
    let sortedRateStay = utilService.sortByRate(stays,4)
    console.log('sortedRateStay:', sortedRateStay)
    
    return (
        <div className="stay-list grid">
            {sortedRateStay.slice(0,4).map(stay =>
                <StayPreview
                    stay={stay}
                    key={stay._id}
                />)}
        </div>
    )
    
}

