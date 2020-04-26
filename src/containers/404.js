import React, { Component } from 'react';
import Typography from '../components/Typography';

class Error404 extends Component {

    error404Handler = () => {
        this.props.history.goBack();
    }
    
  render() {
    return (
      <div className='Error' style={{ textAlign: 'center' }}>
        <Typography type='h3' config={{ className: 'HeadingLarge' }}>
          Sorry! Page not found.
        </Typography>
        <button className='ButtonSmall' onClick={this.error404Handler}>Go Back</button>
      </div>
    );
  }
}

export default Error404;
