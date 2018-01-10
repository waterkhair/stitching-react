// Modules
import ConfirmComponent from "./components/confirm";
import LoadingComponent from "./components/loading";
import LoginComponent from "./components/login";
import LogoutComponent from "./components/logout";
import ProfileComponent from "./components/profile";
import ReduxActions from "./redux/actions";
import ReduxReducers from "./redux/reducers";
import ResetPasswordComponent from "./components/reset_password";
import Stitching from "stitching";
import {THEME_COLORS} from "./common";
import TableComponent from "./components/table";

// Export actions, reducers and components
export const Actions = ReduxActions;
export const Confirm = ConfirmComponent;
export const Loading = LoadingComponent;
export const Login = LoginComponent;
export const Logout = LogoutComponent;
export const Profile = ProfileComponent;
export const Reducers = ReduxReducers;
export const ResetPassword = ResetPasswordComponent;
export const Table = TableComponent;
export const ThemeColors = THEME_COLORS;
export const {connect} = Stitching;
export const stitching = Stitching;
export default {
    Actions,
    Confirm,
    Loading,
    Login,
    Logout,
    Profile,
    Reducers,
    ResetPassword,
    Table,
    ThemeColors,
    connect,
    stitching
};

