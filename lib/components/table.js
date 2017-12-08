"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("react-table/react-table.css");

var _common = require("../common");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactTable = require("react-table");

var _reactTable2 = _interopRequireDefault(_reactTable);

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Modules


// Constants
var EMPTY_ARRAY = [];
var MAX_COLUMNS = 10;
var tableProps = {
    defaultPageSize: 5,
    manual: true,
    minRows: 0,
    showPageJump: false
};

var StitchingTableComponent = function (_StitchingBaseCompone) {
    _inherits(StitchingTableComponent, _StitchingBaseCompone);

    function StitchingTableComponent(props) {
        _classCallCheck(this, StitchingTableComponent);

        var _this = _possibleConstructorReturn(this, (StitchingTableComponent.__proto__ || Object.getPrototypeOf(StitchingTableComponent)).call(this, props));

        _this.state = _extends({}, _this.state, {
            start: _common.INDEXES.FIRST
        });

        _this.fetchData = _this.fetchData.bind(_this);
        _this.getColumns = _this.getColumns.bind(_this);
        _this.moreColumnsCreator = _this.moreColumnsCreator.bind(_this);
        return _this;
    }

    _createClass(StitchingTableComponent, [{
        key: "fetchData",
        value: function fetchData(tableState) {
            this.props.fetchData(tableState.pageSize, tableState.page, tableState.sorted, tableState.filtered);
        }
    }, {
        key: "getColumns",
        value: function getColumns() {
            if (this.props.columns.length <= MAX_COLUMNS) {
                return this.props.columns;
            }

            var leftButtonDisabled = this.state.start === _common.INDEXES.FIRST;
            var rightButtonDisabled = this.state.start + MAX_COLUMNS === this.props.columns.length;
            var leftButtonColumn = leftButtonDisabled ? [] : [{
                Header: _react2.default.createElement(
                    "span",
                    { className: "stitching-caret", onClick: this.moreColumnsCreator("left") },
                    _react2.default.createElement("i", { className: "stitching-caret-left" })
                ),
                sortable: false,
                style: { userSelect: "none" },
                width: 15
            }];
            var rightButtonColumn = rightButtonDisabled ? [] : [{
                Header: _react2.default.createElement(
                    "span",
                    { className: "stitching-caret", onClick: this.moreColumnsCreator("right") },
                    _react2.default.createElement("i", { className: "stitching-caret-right" })
                ),
                sortable: false,
                style: { userSelect: "none" },
                width: 15
            }];
            var columns = [].concat(leftButtonColumn, _toConsumableArray(this.props.columns.slice(this.state.start, this.state.start + MAX_COLUMNS).map(function (column) {
                return Object.assign({ style: { textAlign: "center" } }, column);
            })), rightButtonColumn);

            return columns;
        }
    }, {
        key: "moreColumnsCreator",
        value: function moreColumnsCreator(direction) {
            var _this2 = this;

            return function () {
                _this2.setState({ start: _this2.state.start + (direction === "left" ? -_common.COUNT.ONE : _common.COUNT.ONE) });
            };
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                data = _props.data,
                id = _props.id,
                loading = _props.loading,
                themeColor = _props.themeColor,
                pages = _props.pages;


            return _react2.default.createElement(
                "div",
                { className: themeColor },
                _react2.default.createElement(_reactTable2.default, _extends({ className: "-striped -highlight", columns: this.getColumns(), data: data, id: id, loading: loading, onFetchData: this.fetchData, pages: pages, resizable: false }, tableProps))
            );
        }
    }]);

    return StitchingTableComponent;
}(_base2.default);

StitchingTableComponent.defaultProps = {
    data: EMPTY_ARRAY,
    loading: false,
    pages: 1
};
StitchingTableComponent.propTypes = _extends({
    columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        Header: _propTypes2.default.string.isRequired,
        accessor: _propTypes2.default.string.isRequired,
        sortable: _propTypes2.default.bool
    })).isRequired,
    data: _propTypes2.default.arrayOf(_propTypes2.default.object),
    fetchData: _propTypes2.default.func.isRequired,
    id: _propTypes2.default.string.isRequired,
    loading: _propTypes2.default.bool,
    pages: _propTypes2.default.number
}, _base2.default.propTypes);
exports.default = StitchingTableComponent;