import { Link } from 'react-router-dom';
import {PageLoader} from '../commonCmps/PageLoader.jsx'


export function PopularPlaces({ popularLoc }) {


    if(!popularLoc) return <PageLoader/>
    return (
        <div className="popular-places-list grid ">
            {popularLoc.map(location =>
                <div key={location.name} className="popular-places-preview" >
                    <Link to={`/stay/location/${location.name}`} className="clean-list">
                        <img src={location.pic} alt=""/>
                        <h5 className="popular-places-preview-location"> {location.name}</h5>
                    </Link>
                </div>)}
        </div>
    )
}