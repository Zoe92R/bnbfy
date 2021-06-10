export function GuestChooseDetails({ toggleChoose, guestUpdate, guest }) {

    function onGuestsUpdate(type, diff) {
        guest[type] += diff
        // console.log('guest[type]:', guest[type], type)
        if ((guest.infants || guest.kids) && !guest.adults) guest.adults = 1
        guestUpdate(guest)
    }

    return (
        <div className="guest-choose-details flex column">
            <div className="guest-choose-line flex align-center space-between">
                <div className="text-warpper-line flex column">
                    <span className="text-warpper-line-first">
                        Adults:
                    </span>
                    <span className="text-warpper-line-sec">
                        Ages 13 or above
                    </span>
                </div>
                <div className="guest-btn-warrper flex space-around"><button disabled={!guest.adults} className="guest-btn-modal"
                    onClick={() => onGuestsUpdate('adults', -1)}>-</button>
                    <span style={{ margin: "2px" }}>{guest.adults}</span>
                    <button disabled={guest.adults === 16} className="guest-btn-modal" onClick={() => onGuestsUpdate('adults', 1)}>+</button></div>
            </div>         <div className="guest-choose-line flex align-center space-between">
                <div className="text-warpper-line flex column">
                    <span className="text-warpper-line-first">
                        Children:
                    </span>
                    <span className="text-warpper-line-sec">
                        Ages 2–12
                    </span>
                </div>
                <div className="guest-btn-warrper flex space-around"><button disabled={!guest.kids} className="guest-btn-modal"
                    onClick={() => onGuestsUpdate('kids', -1)}>-</button>
                    <span style={{ margin: "2px" }}>{guest.kids}</span>
                    <button disabled={guest.kids === 5} className="guest-btn-modal" onClick={() => onGuestsUpdate('kids', 1)}>+</button></div>
            </div>
            <div className="guest-choose-line flex align-center space-between">
                <div className="text-warpper-line flex column">
                    <span className="text-warpper-line-first">
                        Infants:
                    </span>
                    <span className="text-warpper-line-sec">
                        Under 2
                    </span>
                </div>
                <div className="guest-btn-warrper flex space-around">
                    <button className="guest-btn-modal"
                        onClick={() => onGuestsUpdate('infants', -1)} disabled={(!guest.infants)}>-</button>
                    <span style={{ margin: "2px" }}>{guest.infants}</span>
                    <button disabled={guest.infants === 5} className="guest-btn-modal" onClick={() => onGuestsUpdate('infants', 1)}>+</button>
                    {/* <button classaName="guests-close"onClick={() => toggleChoose()} >close</button> */}
                </div>
            </div>


        </div>
    )

}