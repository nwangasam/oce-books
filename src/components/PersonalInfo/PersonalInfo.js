import React from 'react';

import Section from '../Section/Section';
import TextInput from '../TextInput/TextInput';
import Aux from '../../hoc/Auxiliary';

const personalInfo = (props) => (
    <Aux>
        <Section sectionTitle="Personal Info" center>
            <TextInput 
                label="Name" 
                name="name" 
                index="1"
                getInput={props.input} 
                placeholder="Fullname, nickname, business name" />
        </Section>
    </Aux>
);

export default personalInfo;