import React from 'react';

import './SideDrawer.css';
import BackDrop from '../BackDrop/BackDrop';
import Logo from '../../Logo/Logo';
import { ToggleButtonCancel } from '../ToggleButton/ToggleButton';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';

const sideDrawer = (props) => {
    const assignedClasses = ["SideDrawer"]
    if (props.show) assignedClasses.push("Show");

    return (
        <>
            <BackDrop show={props.show} clicked={props.close} />
            <ToggleButtonCancel show={props.show} clicked={props.close} />
            <div className={assignedClasses.join(' ')} onClick={props.close}>
                <Logo color="#786053" />
                {/* <NavigationItems navTitle="Resources"/> */}
                <footer className="Footer">
                    <p className="TermsConditions"><strong>T &amp; C: </strong>A user can request only for one book per day.</p>
                    <p className="Copyright">OCE BOOKS Inc, {new Date().getFullYear()} &copy;</p>
                </footer>
            </div>
        </>
    )
}

export default sideDrawer
