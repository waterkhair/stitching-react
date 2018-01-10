"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setLoading = exports.setCredentials = exports.getCurrentUserProfile = undefined;

var _common = require("../common");

// Actions
var getCurrentUserProfile = exports.getCurrentUserProfile = function getCurrentUserProfile(stitching) {
    return function (dispatch) {
        dispatch({
            loading: true,
            type: _common.ACTION_TYPES.SET_LOADING
        });

        stitching.auth.getCredentials().then(function (credentials) {
            if (credentials) {
                dispatch({
                    credentials: credentials,
                    isAuthenticated: true,
                    type: _common.ACTION_TYPES.SET_CREDENTIALS
                });
            }

            dispatch({
                loading: false,
                type: _common.ACTION_TYPES.SET_LOADING
            });
        }).catch(function (err) {
            console.error(err.message);
        });
    };
}; // Modules
var setCredentials = exports.setCredentials = function setCredentials(credentials, isAuthenticated) {
    return {
        credentials: credentials,
        isAuthenticated: isAuthenticated,
        type: _common.ACTION_TYPES.SET_CREDENTIALS
    };
};
var setLoading = exports.setLoading = function setLoading(loading) {
    return {
        loading: loading,
        type: _common.ACTION_TYPES.SET_LOADING
    };
};
exports.default = {
    getCurrentUserProfile: getCurrentUserProfile,
    setCredentials: setCredentials,
    setLoading: setLoading
};