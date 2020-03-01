import React, {useReducer} from "react";

import AuthContext from "./AuthContext";
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

    // Login User
    const loginUser = async () => {
        try {
            const res = await axios.get("/auth/api/current_user");
            if (res.data !== "Not Logged In") {
                dispatch({type: LOGIN, payload: res.data});
            }
            else {
                dispatch({type: AUTH_ERROR, payload: res.data})
            }
        } catch (e) {
            dispatch({type: AUTH_ERROR, payload: "Unknown Error"})
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
                dispatch({type: AUTH_ERROR, payload: res.data})
            }
        } catch (e) {
            dispatch({type: AUTH_ERROR, payload: "Unknown Error"})
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
                logoutUser,
                clearErrors
            }
        }>
        {props.children}
    </AuthContext.Provider>
};

export default AuthState;
