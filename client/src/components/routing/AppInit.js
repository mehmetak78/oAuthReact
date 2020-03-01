import React, {Fragment, useContext, useEffect} from 'react';

import AuthContext from "../../context/auth/AuthContext";


const AppInit = props => {

    const authContext = useContext(AuthContext);

    const {loginUser} = authContext;

    useEffect(() => {
        loginUser();
        console.log("AppInit : loginUser()")
        //eslint-disable-next-line
    }, []);

    return (
        <Fragment>
        </Fragment>
    );
};


export default AppInit;


