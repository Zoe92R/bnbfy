import Kitchen from '../../assets/svg/amenties/kitchen.svg';
import TV from '../../assets/svg/amenties/TV.svg';
import Pets_allowed from '../../assets/svg/amenties/Pets_allowed.svg';
import Elevator from '../../assets/svg/amenties/Elevator.svg';
import Wifi from '../../assets/svg/amenties/Wifi.svg';
import Gym from '../../assets/svg/amenties/Gym.svg';
import Smoking from '../../assets/svg/amenties/smoking.svg';
import Hot_tub from '../../assets/svg/amenties/hot_tub.svg';
import Air_conditining from '../../assets/svg/amenties/Air_conditioning.svg';
// import Cooking_basics from '../../assets/svg/amenties/Cooking_basics.svg';

export function AmentiesList({ aments }) {

    function getAmenityImg(amenity) {
        switch (amenity) {
            case 'Kitchen':
                return Kitchen
            case 'Wifi':
                return Wifi
            case 'Gym':
                return Gym
            case 'Pets allowed':
                return Pets_allowed
            case 'TV':
                return TV
            case 'Elevator':
                return Elevator
            case 'Air conditining':
                return Air_conditining
            case 'Smoking allowed':
                return Smoking
            case 'Hot tub':
                return Hot_tub
            // case 'Cooking basics':
            //     return Cooking_basics
            default:
                return ''
        }
    }




    let currImg
    return (
        <div className="aments-container">
            <ul className="aments-list grid">{aments.map((amenity, idx) => {
                currImg = getAmenityImg(amenity)
                if (!currImg) return
                return (
                    <div key={amenity} className="flex"><img key={amenity} className="amenty-icon" src={currImg} alt="" key={idx} />
                    
                        <li key={amenity} className="clean-list">{amenity}</li> </div>
                )
            })
            }
            </ul >
        </div>
    )
}


