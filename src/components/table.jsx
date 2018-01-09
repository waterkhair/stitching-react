// Modules
import "react-table/react-table.css";
import {COUNT, INDEXES} from "../common";
import BaseComponent from "./base";
import PropTypes from "prop-types";
import React from "react";
import ReactTable from "react-table";

// Constants
const EMPTY_ARRAY = [];
const MAX_COLUMNS = 10;
const tableProps = {
    defaultPageSize: 5,
    manual: true,
    minRows: 0,
    showPageJump: false
};

export default class TableComponent extends BaseComponent {
    static defaultProps = {
        data: EMPTY_ARRAY,
        loading: false,
        pages: 1
    }

    static propTypes = {
        columns: PropTypes.arrayOf(PropTypes.shape({
            Header: PropTypes.string.isRequired,
            accessor: PropTypes.string.isRequired,
            sortable: PropTypes.bool
        })).isRequired,
        data: PropTypes.arrayOf(PropTypes.object),
        fetchData: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        loading: PropTypes.bool,
        pages: PropTypes.number,
        ...BaseComponent.propTypes
    }

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            start: INDEXES.FIRST
        };

        this.fetchData = this.fetchData.bind(this);
        this.getColumns = this.getColumns.bind(this);
        this.moreColumnsCreator = this.moreColumnsCreator.bind(this);
    }

    fetchData(tableState) {
        this.props.fetchData(tableState.pageSize, tableState.page, tableState.sorted, tableState.filtered);
    }

    getColumns() {
        if (this.props.columns.length <= MAX_COLUMNS) {
            return this.props.columns;
        }

        const leftButtonDisabled = this.state.start === INDEXES.FIRST;
        const rightButtonDisabled = this.state.start + MAX_COLUMNS === this.props.columns.length;
        const leftButtonColumn = leftButtonDisabled
            ? []
            : [
                {
                    Header: <span className="stitching-caret" onClick={this.moreColumnsCreator("left")}><i className="stitching-caret-left" /></span>,
                    sortable: false,
                    style: {userSelect: "none"},
                    width: 15
                }
            ];
        const rightButtonColumn = rightButtonDisabled
            ? []
            : [
                {
                    Header: <span className="stitching-caret" onClick={this.moreColumnsCreator("right")}><i className="stitching-caret-right" /></span>,
                    sortable: false,
                    style: {userSelect: "none"},
                    width: 15
                }
            ];
        const columns = [
            ...leftButtonColumn,
            ...this.props.columns.slice(this.state.start, this.state.start + MAX_COLUMNS).map((column) => Object.assign({style: {textAlign: "center"}}, column)),
            ...rightButtonColumn
        ];

        return columns;
    }

    moreColumnsCreator(direction) {
        return () => {
            this.setState((prevState) => ({start: prevState.start + (direction === "left" ? -COUNT.ONE : COUNT.ONE)}));
        };
    }

    render () {
        const {data, id, loading, themeColor, pages} = this.props;

        return (
            <div className={themeColor}>
                <ReactTable className="-striped -highlight" columns={this.getColumns()} data={data} id={id} loading={loading} onFetchData={this.fetchData} pages={pages} resizable={false} {...tableProps} />
            </div>
        );
    }
}
