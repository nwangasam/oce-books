import React, { Component } from 'react';
import Form from '../components/Form';
import Typography from '../components/Typography';

class CheckBooks extends Component {

    state = {
        availableBooks: []
    }

    checkAvailableBooks = (event) => {
        console.log(event.target.value);
    }
    
    render () {
        return (
            <div className="CheckBooks">
                <Typography type='h3' config={{ className: 'HeadingLarge' }}>
                    Type the name of the book to check if available
                    
                </Typography>
                <Form fields={['title']} {...this.props} checkbooks />
            </div>
        );
    }
}

export default CheckBooks;