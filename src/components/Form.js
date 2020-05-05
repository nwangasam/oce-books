import React, { Component } from 'react';

import rp from 'request-promise';
import $ from 'cheerio';

import Typography from './Typography';
import Input from './Input';
import Button from './Button';

class Form extends Component {
  state = {
    requestForm: {
      name: {
        type: 'text',
        label: 'NAME',
        value: '',
        elementConfig: {
          id: 'name',
          className: 'InputElement',
          placeholder: 'Fullname, business/nick name',
        },
        isValid: false,
        validation: {
          required: true,
          maxLength: 40,
        },
        touched: false,
      },
      title: {
        type: 'text',
        label: 'TITLE',
        value: '',
        elementConfig: {
          id: 'title',
          className: 'InputElement',
          placeholder:
            this.props.page === 'support'
              ? "What's the title of the book?"
              : 'E.g. Think and Grow Rich',
        },
        isValid: false,
        validation: {
          required: true,
        },
        touched: false,
      },
      author: {
        type: 'text',
        label: 'AUTHOR',
        value: '',
        elementConfig: {
          id: 'author',
          className: 'InputElement',
          placeholder:
            this.props.page === 'support'
              ? 'Who wrote the book?'
              : 'E.g. Napoleon Hills',
        },
        isValid: false,
        validation: {
          required: true,
        },
        touched: false,
      },
      book: {
        type: 'file',
        label: 'CHOOSE FILE',
        value: '',
        elementConfig: {
          id: 'book',
          className: 'InputElement',
          placeholder: '',
        },
        isValid: false,
        validation: {
          required: true,
        },
        touched: false,
      },
      source: {
        type: 'url',
        label: 'SOURCE',
        value: '',
        elementConfig: {
          id: 'source',
          className: 'InputElement',
          placeholder: 'Paste a source link to the book online',
        },
        isValid: false,
        validation: {
          required: true,
        },
        touched: false,
      },
      amount: {
        type: 'number',
        label: 'AMOUNT(USD)',
        value: '',
        elementConfig: {
          id: 'amount',
          className: 'InputElement',
          placeholder: '',
        },
        isValid: false,
        validation: {
          required: true,
        },
      },
      paymentMethod: {
        type: 'select',
        label: '',
        value: '',
        elementConfig: {
          id: 'paymentMethod',
          className: 'Select',
          options: [
            { value: '', displayValue: 'SELECT PAYMENT METHOD' },
            { value: 'transfer', displayValue: 'Bank Transfer' },
            {
              value: 'cardPayment',
              displayValue: 'Card Payment (coming soon!)',
            },
          ],
        },
        isValid: false,
        validation: {
          required: true,
        },
      },
      touched: false,
    },
    isFormValid: false,
    filteredSuggestions: [],
    showSuggestions: false,
  };

  componentDidMount() {
    let newFieldState = {};
    let updatedRequestForm = { ...this.state.requestForm };

    for (let inputElement in updatedRequestForm) {
      if (this.props.fields.includes(inputElement)) {
        newFieldState[inputElement] = updatedRequestForm[inputElement];
      }
    }
    updatedRequestForm = newFieldState;
    this.setState({ requestForm: updatedRequestForm });
  }

  getBook = (url) => {
    rp(url)
      .then((html) => {
        const allBooks = [];

        $('.resItemBox', html).each((i, el) => {
          const book = $('[itemprop=name]', el).text().trim();
          const author = $('.authors', el).text();
          const imageUrl = $('img', el).data('src');
          const publisher = $('[title=Publisher] > a', el).text();
          const yearPublished = $('.property_year .property_value', el).text();
          const file = $('.property__file .property_value', el).text();

          allBooks.push({
            book,
            author,
            imageUrl,
            publisher,
            yearPublished,
            file,
          });
        });

        this.setState({ filteredSpuggestions: allBooks, showSuggestions: true });
      })
      .catch((err) => {
        //handle error
        console.log(err);
        this.setState({ filteredSuggestions: [], showSuggestions: false });
      });
  };

  checkAvailableBooks = (query) => {
    const url = encodeURI(
      `https://cors-anywhere.herokuapp.com/https://b-ok.cc/s/${query}`
    );
    if (query.length % 2 === 0) {
      console.log(query.length);
      this.getBook(url);
    }
  };

  inputChangedHandler = (event, id) => {
    const updatedRequestForm = { ...this.state.requestForm };

    if (this.props.checkbooks) {
      this.checkAvailableBooks(event.currentTarget.value);
    }

    const updatedInputElement = {
      ...updatedRequestForm[id],
    };
    updatedInputElement.value = event.target.value;
    const isValid = this.checkValidity(
      updatedInputElement.value,
      updatedInputElement.validation
    );

    updatedInputElement.isValid = isValid;
    updatedInputElement.touched = true;
    updatedRequestForm[id] = updatedInputElement;

    let isFormValid = true;
    for (let inputElement in updatedRequestForm) {
      isFormValid = updatedRequestForm[inputElement].isValid && isFormValid;
    }

    this.setState({
      requestForm: updatedRequestForm,
      isFormValid: isFormValid,
      showSuggestions: true,
    });
  };

  checkValidity = (value, rule) => {
    let isValid = true;

    if (rule && rule.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rule && rule.maxLength) {
      isValid = value.length <= rule.maxLength && isValid;
    }

    if (rule && rule.minLength) {
      isValid = value.length >= rule.minLength && isValid;
    }

    return isValid;
  };

  formSubmitHandler = (event) => {
    event.preventDefault();

    const {
      name,
      title,
      author,
      book,
      source,
      amount,
      paymentMethod,
    } = this.state.requestForm;

    let requestText = '',
      phoneNo = '2348075075032';

    if (name)
      requestText = encodeURIComponent(
        `Hi! I'm *${name.value}*. I'm not sure what book to request for at the moment. Please suggest a book for me.`
      );

    if (name && title && author)
      requestText = encodeURIComponent(
        `Hi! I'm *${name.value}*. I'm requesting for a book titled *${title.value}* by *${author.value}*`
      );

    if (name && title && author && (source || book))
      requestText = encodeURIComponent(
        `Hello!, I'm *${name.value}*. I'm donating a book in support of OCE BOOKS, titled *${title.value}* written by *${author.value}*`
      );

    if (name && amount && paymentMethod)
      requestText = encodeURIComponent(
        `Hello!, I\'m *${name.value}*. I am donating a sum of *$${amount.value}* in support of OCE BOOKS`
      );

    window.location = `https://wa.me/${phoneNo}?text=${requestText}`;
  };

  render() {
    let inputs = [];
    let updatedRequestForm = { ...this.state.requestForm };
    for (let inputElement in updatedRequestForm) {
      inputs.push({
        ...updatedRequestForm[inputElement],
      });
    }

    const updatedInputs = inputs.map((input, i) => {
      return (
        <Input
          type={input.type}
          label={input.label}
          value={input.value}
          elementConfig={input.elementConfig}
          invalid={!input.isValid && input.touched}
          onChange={(event) => this.inputChangedHandler(event, event.target.id)}
        />
      );
    });

    const renderSuggestBook = (pathname) => {
      if (this.props.match.path === pathname) return <>{updatedInputs[0]}</>;
    };

    const renderCashSupport = (pathname) => {
      if (this.props.match.path === pathname)
        return (
          <>
            <div className='HeadingBox'>
              <Typography type='h2' config={{ className: 'Heading' }}>
                ENTER PAYMENT DETAILS
              </Typography>
              <span></span>
            </div>
            {updatedInputs[0]}
            {updatedInputs[1]}
            {updatedInputs[2]}
          </>
        );
    };

    const renderBookSupport = (pathname) => {
      if (this.props.match.path === pathname)
        return (
          <>
            <div className='HeadingBox'>
              <Typography type='h2' config={{ className: 'Heading' }}>
                PERSONAL INFO
              </Typography>
              <span></span>
            </div>
            {updatedInputs[0]}

            <div className='HeadingBox'>
              <Typography type='h2' config={{ className: 'Heading' }}>
                BOOK INFO
              </Typography>
              <span></span>
            </div>
            {updatedInputs[1]}
            {updatedInputs[2]}

            {updatedInputs[3] && (
              <div className='HeadingBox'>
                <Typography type='h2' config={{ className: 'Heading' }}>
                  UPLOAD BOOK
                </Typography>
                <span></span>
              </div>
            )}
            {updatedInputs[3]}
            {updatedInputs[4]}
          </>
        );
    };

    const renderRequestBook = (pathname) => {
      if (pathname === this.props.match.path)
        return (
          <>
            <div className='HeadingBox'>
              <Typography type='h2' config={{ className: 'Heading' }}>
                PERSONAL INFO
              </Typography>
              <span></span>
            </div>
            {updatedInputs[0]}

            <div className='HeadingBox'>
              <Typography type='h2' config={{ className: 'Heading' }}>
                BOOK INFO
              </Typography>
              <span></span>
            </div>
            {updatedInputs[1]}
            {updatedInputs[2]}
          </>
        );
    };

    const renderCheckBooks = (pathname) => {
      if (pathname === this.props.match.path) {
        return updatedInputs[0];
      }
    };

    let suggestionsListComponent;
    console.log(this.state.filteredSuggestions);

    if (this.state.filteredSuggestions.length > 0) {
      suggestionsListComponent = this.state.filteredSuggestions.map(
        (suggestion, i) => {
          return (
            <li key={suggestion + i}>
              {suggestion.book} by {suggestion.author}
            </li>
          );
        }
      );
    }

    return (
      <div className='Form'>
        <form onSubmit={this.formSubmitHandler}>
          {renderRequestBook('/')}
          {renderSuggestBook('/suggest-book')}
          {renderBookSupport('/support/book')}
          {renderCashSupport('/support/cash')}

          <div className='Suggestion'>
            {renderCheckBooks('/check-books')}
            {this.props.checkbooks && this.state.filteredSuggestions.length > 0 &&
              this.state.showSuggestions && (
                <ul className='Suggestions'>{suggestionsListComponent}</ul>
              )}
          </div>
          <Button
            submit
            disabled={!this.state.isFormValid}
            className='ButtonLarge'
          >
            SUBMIT
          </Button>
        </form>
      </div>
    );
  }
}

export default Form;
