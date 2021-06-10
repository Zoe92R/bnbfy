import '../../assets/styles/font/fontawesome/css/all.css'
export function CitySearchModal({ countrys, onClickTxtModal }) {
console.log('countrys:', countrys)


    return (
        <div className="location-choose-modal flex column">
            {(countrys.length) ? countrys.map((country, idx) =>
                <div className="flex" style={{cursor:'pointer'}} key={idx} >
                    <div className="location-choose-modal-svg flex justify-center align-center"><i className="fas fa-map-marker-alt" ></i></div>

                    <div onClick={() => (onClickTxtModal(country))} className="location-choose-modal-text flex justify-center align-center" >{country}</div>
                </div>
            ) : <div>No location found</div>}

        </div>
    )

}