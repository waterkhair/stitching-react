"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stitching = exports.connect = exports.ThemeColors = exports.Table = exports.ResetPassword = exports.Profile = exports.Login = exports.Confirm = undefined;

var _confirm = require("./components/confirm");

var _confirm2 = _interopRequireDefault(_confirm);

var _login = require("./components/login");

var _login2 = _interopRequireDefault(_login);

var _profile = require("./components/profile");

var _profile2 = _interopRequireDefault(_profile);

var _reset_password = require("./components/reset_password");

var _reset_password2 = _interopRequireDefault(_reset_password);

var _stitching = require("stitching");

var _stitching2 = _interopRequireDefault(_stitching);

var _common = require("./common");

var _table = require("./components/table");

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Confirm = exports.Confirm = _confirm2.default; // Modules
var Login = exports.Login = _login2.default;
var Profile = exports.Profile = _profile2.default;
var ResetPassword = exports.ResetPassword = _reset_password2.default;
var Table = exports.Table = _table2.default;
var ThemeColors = exports.ThemeColors = _common.THEME_COLORS;
var connect = _stitching2.default.connect;
exports.connect = connect;
var stitching = exports.stitching = _stitching2.default;

exports.default = {
    Confirm: Confirm,
    Login: Login,
    Profile: Profile,
    ResetPassword: ResetPassword,
    Table: Table,
    ThemeColors: ThemeColors,
    connect: connect,
    stitching: stitching
};