import React, { Component } from 'react';

import Typography from '../components/Typography';
import Form from '../components/Form';

class RequestBook extends Component {

  render() {
    return (
      <>
        <Typography type='h3' config={{ className: 'HeadingLarge' }}>
          FILL THE FORM BELOW TO REQUEST ANY BOOK OF YOUR CHOICE.
        </Typography>
        <Form {...this.props} fields={['name', 'title', 'author']} />
      </>
    );
  }
}

export default RequestBook;
