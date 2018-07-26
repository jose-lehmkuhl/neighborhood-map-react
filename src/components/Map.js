import React,{ Component } from 'react';

export default class Map extends Component {
    state = {
        map: '',
        markers: '',
        infowindows: ''
    }

    componentDidMount() {
        this.initMap();
        this.makeMarkers();
    }

    componentDidUpdate() {
        this.showMarkers();
        if (this.props.selected) {
            this.showSelected(this.props.selected);
        }
    }

    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: -27.6048916, lng: -48.4702747},
            zoom: 16,
            mapTypeControl: false
          });
          this.setState({map});
    }

    showSelected = id => {
        for (const marker of this.state.markers) {
            if (marker.id === id) {
                marker.setMap(this.state.map);
                this.state.map.setCenter(marker.position);
                for (const infowindow of this.state.infowindows) {
                    infowindow.close();
                    if(infowindow.marker === marker) {
                        infowindow.open(this.state.map,marker);
                    }
                }
            } else {
                marker.setMap(null);
            }
        }
    }

    makeMarkers = () => {
        const markers = [];
        const infowindows = [];
        for (const venue of this.props.venues) {
            const {lat, lng} = venue.location;
            const position = {lat,lng};
            const title = venue.name;
            const id = venue.id;
            const marker = new window.google.maps.Marker({
                position,
                title,
                id,
            });
            markers.push(marker);
            const infowindow = this.makeInfoWindow(marker);
            infowindows.push(infowindow);
            marker.addListener('click', () => {
                this.state.infowindows.forEach(el => {
                    el.close();
                });
                infowindow.open(this.state.map,marker);
            });
        }
        this.setState({infowindows})
        this.setState({ markers });
    }

    makeInfoWindow = (marker) => {
        let address;
        for (const venue of this.props.venues) {
            if (venue.id === marker.id) {
                if (venue.location.address) {
                address = venue.location.address;
                } else {
                    address = 'adress not available.'
                }
            }
        }
            const infowindow = new window.google.maps.InfoWindow();
            infowindow.setContent('');
            infowindow.marker = marker;
            
            const foursquareLink = `https://pt.foursquare.com/v/${marker.id}`;
            infowindow.setContent(
                `<div><h2>${marker.title}</h2><p>${address}</p><p><a href=${foursquareLink}>Link Foursquare</a></p></div>`
            );
            return infowindow;

    }

    showMarkers = () => {
        if (this.props.selected !== ''){
            this.props.onShowAll('');
        }
        for (const marker of this.state.markers) {
            marker.setMap(this.state.map);
        }
    }

    render() {
        console.log(this.state.infowindows)
        return (
            <div>
                <button className="show-all" onClick={() => this.showMarkers()}>Show All</button>
                <div id="map">
                </div>
            </div>
        );
    }
}