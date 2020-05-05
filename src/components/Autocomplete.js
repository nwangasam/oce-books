import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Autocomplete.module.css';

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
  };

  static defaultProps = {
    suggestions: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSugestions: false,
      userInput: '',
    };
  }

  onChangeHandler = (event) => {
    const { suggestions } = this.props;
    let userInput = event.currentTarget.value;

    const filteredSuggestions = suggestions.filter((suggestion, index) =>
      suggestion.toLowerCase().includes(userInput.toLowerCase())
    );

    this.setState({
      filteredSuggestions,
      showSuggestions: true,
      userInput,
    });
  };

  render() {
    const {
      userInput,
      showSuggestions,
      filteredSuggestions,
      activeSuggestion,
    } = this.state;

    let suggestionListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionListComponent = (
          <ul className={classes.suggestions}>
            {filteredSuggestions.map((suggestion, index) => {
              let className = '';

              if (index === activeSuggestion) {
                className = classes['suggestion-active'];
              }
              return (
                <li key={suggestion} className={className}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionListComponent = (
          <p className={classes['no-suggestions']}>
            So suggestions match your search!
          </p>
        );
      }
    }

    return (
      <div className={classes.Autocomplete}>
        <input
          type='search'
          placeholder='Please type your search'
          onChange={this.onChangeHandler}
          value={userInput}
        />
        {suggestionListComponent}
      </div>
    );
  }
}

export default Autocomplete;
