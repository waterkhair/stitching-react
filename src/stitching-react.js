// Modules
import ConfirmComponent from "./components/confirm";
import LoginComponent from "./components/login";
import LogoutComponent from "./components/logout";
import ProfileComponent from "./components/profile";
import ResetPasswordComponent from "./components/reset_password";
import Stitching from "stitching";
import {THEME_COLORS} from "./common";
import TableComponent from "./components/table";

export const Confirm = ConfirmComponent;
export const Login = LoginComponent;
export const Logout = LogoutComponent;
export const Profile = ProfileComponent;
export const ResetPassword = ResetPasswordComponent;
export const Table = TableComponent;
export const ThemeColors = THEME_COLORS;
export const {connect} = Stitching;
export const stitching = Stitching;

export default {
    Confirm,
    Login,
    Logout,
    Profile,
    ResetPassword,
    Table,
    ThemeColors,
    connect,
    stitching
};

