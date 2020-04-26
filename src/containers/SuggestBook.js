import React from 'react';
import Form from '../components/Form';
import Typography from '../components/Typography';

const suggestBook = (props) => {
  return (
    <>
      <Typography type='h3' config={{ className: 'HeadingLarge', style: {marginBottom: '2rem'}}}>
        Please enter your name and submit
      </Typography>
      <Form {...props} path='/suggest-book' fields={['name']} />
    </>
  );
};

export default suggestBook;
