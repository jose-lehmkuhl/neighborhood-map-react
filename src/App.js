import React, { Component } from 'react';
import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Map from './components/Map';
import { tabHandler } from '../src/assets/js';


class App extends Component {
  state = {
    aside: false,
    google: false,
    map: '',
    venues: '',
    selectedVenue: '',
    filter: '',
    foursquareError: ''
  }

  componentDidMount() {
    this.fetchVenues();
    window.onload = () => {
      this.setState({ google: true })
      document.addEventListener('keydown', e => tabHandler(e))
    }
  }
  componentDidUpdate() {
    if (this.state.aside) {
      document.querySelector('.filter-input').focus()
    }
  }

  filterInput = filter => {
    if (!filter) {
      this.setState({ filter, selectedVenue: '' });
    } else {
      this.setState({ filter });
    }
  }

  onPressHeaderButton = () => {
    this.setState(this.state.aside ? { aside: false } : { aside: true, selectedVenue: '' });
  }

  onListItemClick = id => {
    this.setState({ selectedVenue: id, aside: false})
  }

  fetchVenues = () => {
    fetch('https://api.foursquare.com/v2/venues/search?ll=-27.6048916,-48.4702747&radius=1000&categoryId=4d4b7105d754a06374d81259&client_id=RFTSIUVI0BHLSQYB3JCHL3LEJUPEIJIS21TXTYGPBBPJ1WR5&client_secret=KEOUQMNTAVNSKZORXKWKXVZR2MXAO5OMMJJCDAZUBPQD3AY5&v=20120610')
    .then(response => response.json()).then(({ response }) => this.setState({ venues: response.venues }))
    .catch(e => this.setState({foursquareError: true}));
  }


  
  render() {
    return (
      <div className="App">
        <Header onPress={this.onPressHeaderButton}/>
        {/*renders Aside component after venues have been fetched and aside has been set to true*/}
        {this.state.aside && this.state.venues && <Aside list={this.state.venues} filtering={this.state.filter} filter={this.filterInput} selected={this.state.selectedVenue} onPress={this.onListItemClick}/>}
        {/*Renders error message when failed to fetch venues*/}
        {this.state.foursquareError && <div className="error">Failed to load Foursquare, reload to try again</div>}
        {/*Renders Map after Venues were fetched and google maps is loaded in the window*/}
        {this.state.venues && <Map venues={this.state.venues} selected={this.state.selectedVenue} filtering={this.state.filter} filter={this.filterInput}/>}
        <Footer />
      </div>
    );
  }
}

export default App;
