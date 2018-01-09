// Modules
import {ACTION_TYPES} from "../common";

// Actions
export const getCurrentUserProfile = (stitching) => (dispatch) => {
    dispatch({
        loading: true,
        type: ACTION_TYPES.SET_LOADING
    });

    stitching.auth
        .getCredentials()
        .then((credentials) => {
            if (credentials) {
                dispatch({
                    credentials,
                    isAuthenticated: true,
                    type: ACTION_TYPES.SET_CREDENTIALS
                });
            }

            dispatch({
                loading: false,
                type: ACTION_TYPES.SET_LOADING
            });
        })
        .catch((err) => {
            console.error(err.message);
        });
};
export const setCredentials = (credentials, isAuthenticated) => ({
    credentials,
    isAuthenticated,
    type: ACTION_TYPES.SET_CREDENTIALS
});
export const setLoading = (loading) => ({
    loading,
    type: ACTION_TYPES.SET_LOADING
});
export default {
    getCurrentUserProfile,
    setCredentials,
    setLoading
};
