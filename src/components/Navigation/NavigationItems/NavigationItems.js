import React from 'react';

import NavigationItem from './NavigationItem/NaviagationItem';
import './NavigationItems.css';

const navigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            {props.navTitle ? <h3>{props.navTitle}</h3> : null}
            <NavigationItem link="https://www.8freebooks.net/">8 Free books</NavigationItem>
            <NavigationItem link="http://gen.lib.rus.ec/">Library Genesis</NavigationItem>
        </ul>
    );
}

export default navigationItems;