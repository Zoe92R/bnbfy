import { Link } from 'react-router-dom';

export function PopularPlaces({ popularLoc }) {
    return (

        <div className="popular-places-list grid ">
            {popularLoc.map(location =>
                <div key={location.name} className="popular-places-preview" >
                    <Link to={`/stay/${location.name}`} className="clean-list">
                        <img src={location.pic} />
                        <h5 className="popular-places-preview-location"> {location.name}</h5>
                    </Link>
                </div>)}
        </div>
    )
}