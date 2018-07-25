import React,{ Component } from 'react';

export default class Map extends Component {
    state = {
        map: '',
        venues: '',
        markers: ''
    }
    componentDidMount() {
        this.initMap();
        this.fetchPlaces();
    }

    componentDidUpdate() {
        if (this.state.map && this.state.venues) {
            this.markPlaces();
        }
    }

    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: -27.6048916, lng: -48.4702747},
            zoom: 16,
            mapTypeControl: false
          });
          this.setState({map})
    }

    fetchPlaces = () => {
        let places;
        fetch('https://api.foursquare.com/v2/venues/search?ll=-27.6048916,-48.4702747&radius=1000&categoryId=4d4b7105d754a06374d81259&client_id=RFTSIUVI0BHLSQYB3JCHL3LEJUPEIJIS21TXTYGPBBPJ1WR5&client_secret=KEOUQMNTAVNSKZORXKWKXVZR2MXAO5OMMJJCDAZUBPQD3AY5&v=20120610')
        .then(response => response.json()).then(({ response }) => this.setState({ venues: response.venues }));
    }

    markPlaces = () => {
        const markers = [];
        for (const venue of this.state.venues) {
            const {lat, lng} = venue.location;
            const position = {lat,lng};
            const title = venue.name;
            const id = venue.id;
            console.log(position + "   " + title);
            const marker = new window.google.maps.Marker({
                position,
                title,
                id,
                map: this.state.map
            });
            markers.push(marker);
        }
        markers.forEach(marker => {

        })
    }

    render() {
        console.log(this.state.venues)
        return (
            <div id="map">
            </div>
        );
    }
}