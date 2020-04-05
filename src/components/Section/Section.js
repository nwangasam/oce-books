import React from 'react';
import './Section.css';

const section = (props) => {
    const classes = [];
    
    if (props.nomargin) classes.push('noMargin')

    if (props.center) classes.push('Center')

    return (
        <section className="Section">
            <h2 className={classes.join(' ')}>{props.sectionTitle}</h2>
            <div className="SectionContent">{props.children}</div>
        </section>
    );
}

export default section;