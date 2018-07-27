import React, { Component } from 'react';
import Header from './components/Header';
import Aside from './components/Aside';
import Map from './components/Map';


class App extends Component {
  state = {
    aside: false,
    google: false,
    map: '',
    venues: '',
    selectedVenue: ''
  }

  componentDidMount() {
    this.fetchVenues();
   window.onload = () => {
     this.setState({ google: true })
   }
  }

  onPressHeaderButton = () => {
    this.setState({ aside: this.state.aside ? false : true, selectedVenue: '' });
  }

  onListItemClick = id => {
    this.setState({ selectedVenue: id})
  }

  fetchVenues = () => {
    fetch('https://api.foursquare.com/v2/venues/search?ll=-27.6048916,-48.4702747&radius=1000&categoryId=4d4b7105d754a06374d81259&client_id=RFTSIUVI0BHLSQYB3JCHL3LEJUPEIJIS21TXTYGPBBPJ1WR5&client_secret=KEOUQMNTAVNSKZORXKWKXVZR2MXAO5OMMJJCDAZUBPQD3AY5&v=20120610')
    .then(response => response.json()).then(({ response }) => this.setState({ venues: response.venues }));
  }


  
  render() {
    return (
      <div className="App">
        <Header onPress={this.onPressHeaderButton}/>
        {this.state.aside && this.state.venues && <Aside list={this.state.venues} onPress={this.onListItemClick}/>}
        {window.google && this.state.venues && <Map venues={this.state.venues} selected={this.state.selectedVenue}/>}
      </div>
    );
  }
}

export default App;
