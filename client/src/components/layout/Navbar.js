import React, {Fragment, useContext} from 'react';
import PropTypes from 'prop-types';

import AuthContext from "../../context/auth/AuthContext";

const Navbar = props => {
    const {title, icon} = props;

    const authContext = useContext(AuthContext);

    const {isAuthenticated, logoutUser, user} = authContext;

    const onLogout = () => {
        logoutUser();
    };

    const authLinks = (
        <Fragment>
            <li> {user && user.name} </li>
            <li>
                <a onClick={onLogout} href="#"> <i className="fas fa-sign-out-alt"/> <span className="hide-sm"> Logout</span></a>
            </li>
        </Fragment>
    );
    const guestLinks = (
        <Fragment>
            <li>
                <a href="/auth/google">  <i className="fas fa-sign-in-alt"/> <span className="hide-sm"> Login</span></a>
            </li>
        </Fragment>
    );

    return (
        <div>
            <div className="navbar bg-primary">
                <h1>
                    <i className={icon}/> {title}
                </h1>
                <ul>
                    {isAuthenticated?authLinks:guestLinks}
                </ul>
            </div>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
};

Navbar.defaultProps = {
    title: "OAUTH REACT",
    icon : "fas fa-key"
};

export default Navbar;


