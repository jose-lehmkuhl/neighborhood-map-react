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
        for (const marker of this.state.markers) {
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            if (marker.id === id) {
                marker.setAnimation(window.google.maps.Animation.BOUNCE);
                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
                this.state.map.setCenter(marker.position);
                for (const infowindow of this.state.infowindows) {
                    infowindow.close();
                    if(infowindow.marker === marker) {
                        infowindow.open(this.state.map,marker);
                    }
                }
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
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });
            markers.push(marker);
            const infowindow = this.makeInfoWindow(marker);
            infowindows.push(infowindow);
            marker.addListener('click', () => {
                this.state.markers.forEach(el => {
                    el.setAnimation(null);
                    el.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
                });
                marker.setAnimation(window.google.maps.Animation.BOUNCE);
                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
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
            </div>
        );
    }
}