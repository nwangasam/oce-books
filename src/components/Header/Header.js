import React from 'react';

import './Header.css';

import Logo from '../Logo/Logo';
import { ToggleButton } from '../UI/ToggleButton/ToggleButton';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

const header = (props) => {

    return (
        <header className="Header">
            <div className="HeaderInner">
                <Logo color="#fff" />
                <ToggleButton clicked={props.toggleSideDrawer} />
                <nav className="DesktopOnly">
                    <NavigationItems />
                </nav>
            </div>
        </header>
    )
};

export default header;