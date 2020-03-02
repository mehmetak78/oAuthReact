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

            console.log("res.data");
            console.log(res.data);

            if (res.data !== "Not Logged In") {
                dispatch({type: LOGIN, payload: res.data});
            }
            else {
                dispatch({type: AUTH_ERROR, payload: res.data})
            }
        } catch (e) {
            console.log("cathc");
            console.log(e.message);
            console.log(e);

            dispatch({type: AUTH_ERROR, payload: "Unknown Error"})
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

            console.log(res.data);

            if (res.data !== "User Already Exists") {
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
