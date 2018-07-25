import React, { Component } from 'react';
import Header from './components/Header';
import Aside from './components/Aside';


class App extends Component {
  state = {
    aside: false
  }

  onPressHeaderButton = () => {
    this.setState({ aside: this.state.aside ? false : true });
  }
  render() {
    return (
      <div className="App">
        <Header onPress={this.onPressHeaderButton}/>
        {this.state.aside && <Aside />}
      </div>
    );
  }
}

export default App;
