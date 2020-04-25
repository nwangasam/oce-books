import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          className: 'InputElement',
          options: [
            { value: null, displayValue: 'SELECT PAYMENT METHOD' },
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
    },
    isFormValid: false,
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

  inputChangedHandler = (event, id) => {
    const updatedRequestForm = { ...this.state.requestForm };
    console.log(updatedRequestForm);

    const updatedInputElement = {
      ...updatedRequestForm[id],
    };
    updatedInputElement.value = event.target.value;
    const isValid = this.checkValidity(
      updatedInputElement.value,
      updatedInputElement.validation
    );

    updatedInputElement.isValid = isValid;
    updatedRequestForm[id] = updatedInputElement;

    let isFormValid = true;
    for (let inputElement in updatedRequestForm) {
      isFormValid = updatedRequestForm[inputElement].isValid && isFormValid;
    }

    this.setState({
      requestForm: updatedRequestForm,
      isFormValid: isFormValid,
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

    if (name && title && author)
    requestText = encodeURIComponent(
      `Hi! I'm *${name.value}*. I'm requesting for a book titled *${title.value}* by *${author.value}*`
    );
        
    if (name && amount && paymentMethod)
      requestText = encodeURIComponent(
        `Hello!, I\'m *${name}*. I am donating a sum of *$${amount.value}* in support of OCE BOOKS`
      );

    if (name && title && author && source)
      requestText = encodeURIComponent(
        `Hello!, I'm *${name.value}*. I'm donating a book in support of OCE BOOKS, titled *${title.value}* written by *${author.value}*`
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

    const updatedInputs = inputs.map((input) => (
      <Input
        key={input.elementConfig.id}
        type={input.type}
        label={input.label}
        value={input.value}
        elementConfig={input.elementConfig}
        onChange={(event) => this.inputChangedHandler(event, event.target.id)}
      />
    ));

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
            <p className='paragraph-1' style={{ margin: '1.6rem 0 -1.6rem' }}>
              <Link className='Pill' to='/support/books'>
                Check for Unavailable Books
              </Link>
            </p>
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

    return (
      <div className='Form'>
        <form onSubmit={this.formSubmitHandler}>
          {renderRequestBook('/')}
          {renderBookSupport('/support/book')}
          {renderCashSupport('/support/cash')}
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
