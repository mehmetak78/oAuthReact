import {
    LOGIN,
    AUTH_ERROR,
    LOGOUT,
    CLEAR_ERRORS
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };

        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };

        case AUTH_ERROR:
            return {
                ...state,
                error: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
};
