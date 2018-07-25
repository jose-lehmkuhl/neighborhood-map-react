import React, { Component } from 'react';
import Header from './components/Header';
import Aside from './components/Aside';
import Map from './components/Map';


class App extends Component {
  state = {
    aside: false,
    google: false
  }

  componentDidMount() {
   window.onload = () => {
     this.setState({ google: true })
   }
  }

  onPressHeaderButton = () => {
    this.setState({ aside: this.state.aside ? false : true });
  }
  
  render() {
    return (
      <div className="App">
        <Header onPress={this.onPressHeaderButton}/>
        {this.state.aside && <Aside />}
        {window.google && <Map />}
      </div>
    );
  }
}

export default App;
