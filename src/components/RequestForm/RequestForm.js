import React, { Component } from 'react';

import './RequestForm.css';

class RequestForm extends Component {
  state = {
    fullname: '',
    bookTitle: '',
    author: '',
    requestBook: false,
  };

  validateInput = (newState) => {
      if (!newState.fullname == "" &&
        !newState.bookTitle == "" &&
        !newState.author == "") {
             this.setState({ requestBook: true })
        } else {
             this.setState({ requestBook: false })
        }
  };


  inputChangeHandler = (event) => {
    const inputState = {...this.state};
    inputState[event.target.name] = event.target.value;
    this.setState({...inputState});
    console.log({...inputState});
    this.validateInput(inputState);
  };

  render() {
    return (
      <form
        className='Form' 
        action={`https://wa.me/2348075075032?text=Hello! I am *${this.state.fullname}*. I'm requesting for *${this.state.bookTitle}* by *${this.state.author}*`} method="POST">
        <h2>Personal Info</h2>
        <label>Name</label>
        <input
          type='text'
          placeholder='Fullname, nickname, businessname ...'
          value={this.state.fullname}
          name='fullname'
          onChange={this.inputChangeHandler}
        />
        <h2>Book Info</h2>
        <label>Title</label>
        <input
          type='text'
          placeholder='e.g. Think and Grow Rich'
          value={this.state.bookTitle}
          name='bookTitle'
          onChange={this.inputChangeHandler}
        />
        <label>Author</label>
        <input
          type='text'
          placeholder='e.g. Napoleon Hills'
          value={this.state.author}
          name='author'
          onChange={this.inputChangeHandler}
        />
        <div className='Button'>
          <button
            disabled={!this.state.requestBook}
          >
            REQUEST BOOK
          </button>
        </div>
      </form>
    );
  }
}

export default RequestForm;
