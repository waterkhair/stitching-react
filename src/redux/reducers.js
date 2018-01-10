// Modules
import {ACTION_TYPES} from "../common";

// Helpers
const initialState = {
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
export const StitchingReactState = (state = Object.assign({}, initialState), action) => {
    switch (action.type) {
    case ACTION_TYPES.SET_CREDENTIALS: {
        return {
            ...state,
            credentials: {
                email: action.credentials.email ? action.credentials.email : "",
                metadata: action.credentials.metadata
                    ? {
                        dob: {
                            ...state.credentials.metadata.dob,
                            value: action.credentials.metadata.dob && action.credentials.metadata.dob.value ? action.credentials.metadata.dob.value : ""
                        },
                        name: {
                            ...state.credentials.metadata.name,
                            value: action.credentials.metadata.name && action.credentials.metadata.name.value ? action.credentials.metadata.name.value : ""
                        },
                        picture: {
                            ...state.credentials.metadata.picture,
                            value: action.credentials.metadata.picture && action.credentials.metadata.picture.value ? action.credentials.metadata.picture.value : ""
                        },
                        themeColor: {
                            ...state.credentials.metadata.themeColor,
                            value: action.credentials.metadata.themeColor && action.credentials.metadata.themeColor.value ? action.credentials.metadata.themeColor.value : ""
                        }
                    }
                    : {
                        ...initialState.credentials.metadata
                    }
            },
            isAuthenticated: action.isAuthenticated ? action.isAuthenticated : false
        };
    }
    case ACTION_TYPES.SET_LOADING: {
        return {
            ...state,
            loading: action.loading
        };
    }
    default:
        return state;
    }
};
export default {
    StitchingReactState
};
