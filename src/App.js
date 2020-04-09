import React, { Component } from 'react';
import './App.css';

import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import RequestForm from './components/RequestForm/RequestForm';
import SideDrawer from './components/UI/SideDrawer/SideDrawer';

class App extends Component {

  state = {
    openDrawer: false
  }

  toggleSideDrawerHandler = () => {
    this.setState((prevState) => {
      return {
        openDrawer: !prevState.openDrawer
      }
    })
  }

  closeSideDrawerHandler = () => {
    this.setState({ openDrawer: false })
  }

  render() {
    return (
      <>
      <SideDrawer show={this.state.openDrawer} close={this.closeSideDrawerHandler} />
      <div className='App'>
        <Header toggleSideDrawer={this.toggleSideDrawerHandler}/>
        <main className='Content'>
          <Welcome />
          <RequestForm />
        </main>
      </div>
      </>
    );
  }
}

export default App;
