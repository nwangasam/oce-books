import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import Typography from '../components/Typography';
import AsyncComponent from '../hoc/asyncComponent';

const AsyncForm = AsyncComponent(() => {
  return import('../components/Form');
});

class Support extends Component {
  render() {
    const supportBookFields = ['name', 'title', 'author', 'book', 'source'];
    const supportCashFields = ['name', 'amount', 'paymentMethod'];
    return (
      <div className='Support'>
        <Typography type='h3' config={{ className: 'HeadingLarge' }}>
          Love to donate a book or cash?
        </Typography>

        {/* <p className='paragraph-1' style={{ margin: '1.6rem 0 -1.6rem' }}>
          <Link className='Pill' to='/support/books'>
            Check for Unavailable Books
          </Link>
        </p> */}

        <div
          className={
            this.props.history.location.pathname !== '/support'
              ? 'Tab active'
              : 'Tab'
          }
        >
          <NavLink to='/support/book' className='TabButton'>
            <Typography type='h2' config={{ className: 'Heading' }}>
              DONATE BOOK
            </Typography>
          </NavLink>

          <NavLink to='/support/cash' className='TabButton'>
            <Typography type='h2' config={{ className: 'Heading' }}>
              DONATE CASH
            </Typography>
          </NavLink>
        </div>
        <Route
          path='/support/book'
          render={(props) => (
            <AsyncForm {...props} page='support' fields={supportBookFields} />
          )}
        />
        <Route
          path='/support/cash'
          render={(props) => (
            <AsyncForm {...props} page='support' fields={supportCashFields} />
          )}
        />
      </div>
    );
  }
}

export default Support;
