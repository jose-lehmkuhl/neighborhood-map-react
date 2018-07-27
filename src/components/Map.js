import React,{ Component } from 'react';

export default class Map extends Component {
    state = {
        map: '',
        markers: '',
        infowindows: '',
    }

    componentDidMount() {
        this.initMap();
        this.makeMarkers();
    }

    componentDidUpdate() {
        for (const marker of this.state.markers) {
            marker.setMap(this.state.map);
        }
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
        this.clearMarkers();
        for (const marker of this.state.markers) {
            marker.setMap(null);
            if (marker.id === id) {
                this.setSelectedAtributes(marker);
            }
        }
    }

    clearMarkers() {
        this.state.markers.forEach(marker => {
            marker.setAnimation(null);
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
        });
        this.state.infowindows.forEach(el => {
            el.close();
        })
    }

    setSelectedAtributes(marker) {
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
        marker.setMap(this.state.map);
        const lat = marker.position.lat() +0.002;
        const lng = marker.position.lng();
        this.state.map.setCenter({lat,lng});
        this.state.infowindows.forEach(el => {
            if(el.marker.id === marker.id) {
                el.open(this.state.map,marker);
            }
        });
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
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
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });
            markers.push(marker);
            const infowindow = this.makeInfoWindow(marker);
            infowindows.push(infowindow);
            marker.addListener('click', () => {
                this.clearMarkers();
                this.setSelectedAtributes(marker);
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
            const infowindow = new window.google.maps.InfoWindow({
                maxWidth: 200
            });
            infowindow.setContent('');
            infowindow.marker = marker;
            infowindow
            infowindow.addListener('closeclick', () => {
                infowindow.marker.setAnimation(null);
                infowindow.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            })
            const foursquareLink = `https://pt.foursquare.com/v/${marker.id}`;
            infowindow.setContent(
                `<div><h2>${marker.title}</h2><p>${address}</p><p><a href=${foursquareLink}>Link Foursquare</a></p></div>`
            );
            return infowindow;

    }

    showMarkers = () => {
        for (const marker of this.state.markers) {
            marker.setMap(this.state.map);
        }
    }

    render() {
        return (
            <div>
                <div id="map">
                </div>
                <button className="show-all" onClick={this.showMarkers}>Show All</button>
            </div>
        );
    }
}