import React,{ Component } from 'react';

export default class Map extends Component {
    state = {
        map: '',
        markers: '',
        infowindows: '',
        error: false
    }

    componentDidMount() {
        window.initMap = this.initMap;
        loadJS('https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=AIzaSyBHomBHdIwWefOY0RQF2KXg2w-AWOYE0fw&callback=initMap', this.onMapsError);
    }

    componentDidUpdate() {
        if (this.state.map) {
            for (const marker of this.state.markers) {
                marker.setMap(this.state.map);
            }
            if (this.props.filter) {
                this.filterMarkers(this.props.filtering);
            }
            if (this.props.selected) {
                this.showSelected(this.props.selected);
            }
        }
    }

    onMapsError = () => {
        this.setState({ error: true });
    }


    filterMarkers = filter => {
        filter = filter.toUpperCase();
        for (const marker of this.state.markers) {
            const title = marker.title.toUpperCase();
            if (title.includes(filter)){
                marker.setMap(this.state.map);
            } else {
                marker.setMap(null);
            }

        }
    }

    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: -27.6048916, lng: -48.4702747},
            zoom: 16,
            mapTypeControl: false
          });
          this.makeMarkers();
          this.setState({map});
    }

    showSelected = id => {
        this.clearMarkers();
        for (const marker of this.state.markers) {
            if (marker.id === id) {
                this.setSelectedAtributes(marker);
            }
        }
        document.querySelector('.pre-info').focus();
    }

    clearMarkers = () => {
        this.state.markers.forEach(marker => {
            marker.setAnimation(null);//removes animation for every marker 
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');//set default marker icon
        });
        this.state.infowindows.forEach(el => {
            el.close();//closes all infowindows
        })
    }

    setSelectedAtributes(marker) {
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');//set selected marker blue icon
        marker.setMap(this.state.map);//shows marker on map
        const lat = marker.position.lat() +0.002; //get a higher lat than the actual marker, so the screen center on the infowindow
        const lng = marker.position.lng();
        this.state.map.setCenter({lat,lng});
        this.state.infowindows.forEach(el => {
            if(el.marker.id === marker.id) {
                el.open(this.state.map,marker);//open the infowindow for the selected marker
            }
        });
        marker.setAnimation(window.google.maps.Animation.BOUNCE);//adds marker animation
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
            markers.push(marker); //adds the marker to the markers array
            const infowindow = this.makeInfoWindow(marker); //makes an infowindow for the marker
            
            infowindows.push(infowindow); //adds infowindow to the infowindows array
            marker.addListener('click', () => { //adds a listener to the marker, wich resets other markers to default and adds new style to the clicked one
                this.clearMarkers();
                this.setSelectedAtributes(marker);
            });
        }
        this.setState({ infowindows, markers }); //stores infowindows and markers array to state
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
            infowindow.addListener('closeclick', () => {
                infowindow.marker.setAnimation(null);
                infowindow.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            })
            const foursquareLink = `https://pt.foursquare.com/v/${marker.id}`;
            infowindow.setContent(
                `<div>
                    <h2 class="infowindow-header" aria-label="${marker.title} info" tabindex="0">${marker.title}</h2>
                    <p tabindex="0" aria-label="adress, ${address}">${address}</p>
                    <p tabindex="-1"><a class="infowindow-link" href=${foursquareLink}>Link Foursquare</a></p>
                </div>`
            );
            return infowindow;

    }

    showMarkers = () => {
        for (const marker of this.state.markers) {
            marker.setMap(this.state.map);
        }
        this.props.filter('');
    }

    render() {
        return (
            <div>
                <div id="map">
                {this.state.error && <div className="error">Failed to load Google Maps, please try again</div>}
                </div>
                <span tabIndex="0" className="pre-info not-visible">You are now on a infowindow</span>
                <button className="show-all" onClick={() => {this.showMarkers(); this.props.filter('')}}>Show All</button>
                <button tabIndex="-1" className="close-info not-visible" aria-label="Close InfoWindow" onClick={() => {this.clearMarkers(); document.querySelector('.filter-button').focus();}}></button>
            </div>
        );
    }
}

function loadJS(src , onerror) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.onerror = onerror;
    ref.parentNode.insertBefore(script, ref);
}