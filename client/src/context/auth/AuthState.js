import React, {useReducer, useContext} from "react";

import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";
import AuthReducer from "./AuthReducer";

import axios from "axios";

import {
    LOGIN,
    LOGOUT,
    AUTH_ERROR,
    CLEAR_ERRORS
} from "../types";

const AuthState = props => {
    const initialState = {
        isAuthenticated: false,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;

    // Login User Google
    const loginUser = async () => {
        try {
            const res = await axios.get("/auth/api/current_user");
            if (res.data !== "Not Logged In") {
                dispatch({type: LOGIN, payload: res.data});
            }
            else {
                //setAlert(res.data,"danger");
            }
        } catch (e) {
            setAlert("Unknown Error","danger");
        }
    };

    // Local Login User
    const localLogin = async (username, password) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.post('/auth/local/login', {
                username,
                password
            }, config);
            if (res.data.id) {
                dispatch({type: LOGIN, payload: res.data});
            }
            else {
                setAlert(res.data,"danger");
            }
        } catch (e) {
            setAlert("Unknown Error","danger");
        }
    };

    // Local Login User
    const localRegister = async (username, password, name) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.post('/auth/local/register', {
                username,
                password,
                name
            }, config);

            if (res.data.id ) {
                dispatch({type: LOGIN, payload: res.data});
            }
            else {
                setAlert(res.data,"danger");
            }
        } catch (e) {
            setAlert("Unknown Error","danger");
        }
    };

    // Logout User
    const logoutUser = async () => {
        try {
            const res = await axios.get("/auth/api/logout");
            if (res.data === "Logged Out") {
                dispatch({type:LOGOUT});
            }
            else {
                setAlert(res.data,"danger");
            }
        } catch (e) {
            setAlert("Unknown Error","danger");
        }

    };
    // clear Errors
    const clearErrors = () => {
        dispatch({type:CLEAR_ERRORS});
    };
    return <AuthContext.Provider
        value={
            {
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                error: state.error,
                loginUser,
                localLogin,
                localRegister,
                logoutUser,
                clearErrors
            }
        }>
        {props.children}
    </AuthContext.Provider>
};

export default AuthState;
