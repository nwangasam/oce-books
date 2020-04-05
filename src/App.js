import React, { Component } from 'react';
import './App.css';

import Header from './components/Header/Header';
import Button from './components/UI/Button/Button';

import Welcome from './components/Welcome/Welcome';
import PersonalInfo from './components/PersonalInfo/PersonalInfo';
import BookInfo from './components/BookInfo/BookInfo';

class App extends Component {

  state = {
    name: null,
    book: null,
    author: null,
    sending: false,
    requestLink: () => {
      return `https://wa.me/2348075075032?text=Hello! I am ${this.state.name}. I'm requesting for ${this.state.book} by ${this.state.author}`
    }
  }

  getInputValue = (e) => {
    e.preventDefault();
    const {name, book, author} = this.state;
    if (name && book && author) {
      this.setState({ sending: true })
    } else {
      this.setState({ sending: false })
    }
    this.setState({[e.target.name]: e.target.value});
  }
  
  render() {
    return (
        <div className="App">
          <Header />
          <Welcome />
          <PersonalInfo input={this.getInputValue} />
          <BookInfo input={this.getInputValue} />
          <Button link={this.state.requestLink} 
            send={this.state.sending}
            hasLink>REQUEST BOOK</Button>
        </div>
    )
  }
}


export default App;
