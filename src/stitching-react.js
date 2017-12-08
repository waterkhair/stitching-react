// Modules
import ConfirmComponent from "./components/confirm";
import LoginComponent from "./components/login";
import ProfileComponent from "./components/profile";
import ResetPasswordComponent from "./components/reset_password";
import {THEME_COLORS} from "./common";
import TableComponent from "./components/table";
import stitching from "stitching";

export const {connect} = stitching;
export const Confirm = ConfirmComponent;
export const Login = LoginComponent;
export const Profile = ProfileComponent;
export const ResetPassword = ResetPasswordComponent;
export const Table = TableComponent;
export const ThemeColors = THEME_COLORS;

export default {
    Confirm,
    Login,
    Profile,
    ResetPassword,
    Table,
    ThemeColors,
    connect
};

