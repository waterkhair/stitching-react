"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StitchingReactState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Modules


var _common = require("../common");

// Helpers
var initialState = {
    credentials: {
        email: "",
        metadata: {
            dob: {
                type: "date",
                value: ""
            },
            name: {
                type: "text",
                value: ""
            },
            picture: {
                hidden: true,
                type: "image",
                value: ""
            },
            themeColor: {
                type: "theme",
                value: "black"
            }
        }
    },
    isAuthenticated: false,
    loading: true
};

// Reducers
var StitchingReactState = exports.StitchingReactState = function StitchingReactState() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object.assign({}, initialState);
    var action = arguments[1];

    switch (action.type) {
        case _common.ACTION_TYPES.SET_CREDENTIALS:
            {
                return _extends({}, state, {
                    credentials: {
                        email: action.credentials.email ? action.credentials.email : "",
                        metadata: action.credentials.metadata ? {
                            dob: _extends({}, state.credentials.metadata.dob, {
                                value: action.credentials.metadata.dob && action.credentials.metadata.dob.value ? action.credentials.metadata.dob.value : ""
                            }),
                            name: _extends({}, state.credentials.metadata.name, {
                                value: action.credentials.metadata.name && action.credentials.metadata.name.value ? action.credentials.metadata.name.value : ""
                            }),
                            picture: _extends({}, state.credentials.metadata.picture, {
                                value: action.credentials.metadata.picture && action.credentials.metadata.picture.value ? action.credentials.metadata.picture.value : ""
                            }),
                            themeColor: _extends({}, state.credentials.metadata.themeColor, {
                                value: action.credentials.metadata.themeColor && action.credentials.metadata.themeColor.value ? action.credentials.metadata.themeColor.value : ""
                            })
                        } : _extends({}, initialState.credentials.metadata)
                    },
                    isAuthenticated: action.isAuthenticated ? action.isAuthenticated : false
                });
            }
        case _common.ACTION_TYPES.SET_LOADING:
            {
                return _extends({}, state, {
                    loading: action.loading
                });
            }
        default:
            return state;
    }
};
exports.default = {
    StitchingReactState: StitchingReactState
};