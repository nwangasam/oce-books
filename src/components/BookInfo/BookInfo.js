import React from 'react';

import Section from '../Section/Section';
import Aux from '../../hoc/Auxiliary';
import TextInput from '../TextInput/TextInput';

const bookInfo = (props) => (
    <Aux>
        <Section sectionTitle="Book Info" center>
            <TextInput label="Title" 
                getInput={props.input} 
                name="book" 
                index="2"
                placeholder="e.g. Think and grow rich" />
            <TextInput 
                label="Author" 
                getInput={props.input} 
                index="3"
                name="author" 
                placeholder="e.g. Napoleon Hills" />
        </Section>
    </Aux>
)

export default bookInfo;
