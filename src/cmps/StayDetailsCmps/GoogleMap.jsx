import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Component } from 'react';
const style = {
    height: "350px",
    overflowX: "hidden",
    overflowY: "hidden",

};
const containerStyle = {
    width: "100%",
    height: "350px",
    position: "relative"
};
class _GoogleMap extends Component {


    state = {
        lat: this.props.loc.lat,
        lng: this.props.loc.lng
    }

    onMapClicked = (props, map, ev) => {
        this.setState({ lat: ev.latLng.lat(), lng: ev.latLng.lng() })
    }

    render() {
        const { lat, lng } = this.state
        return (
            <Map

                google={this.props.google}
                zoom={16}
                style={style} containerStyle={containerStyle}
                initialCenter={{
                    lat,
                    lng
                }}
                center={this.state}
                onClick={this.onMapClicked}
            >

                <Marker
                    position={this.state}
                    name={'Current location'} />
            </Map>
        );
    }
}

export const GoogleMap = GoogleApiWrapper({
    apiKey: ('')
})(_GoogleMap)