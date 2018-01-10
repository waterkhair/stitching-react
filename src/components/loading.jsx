// Modules
import BaseComponent from "./base";
import PropTypes from "prop-types";
import React from "react";

// Constants
const LOADING_SCREEN_STYLE = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100vh",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100vw",
    zIndex: 10
};
const LOADING_STYLE = {
    animation: "spin 2s linear infinite",
    border: "2vmin solid #f3f3f3",
    borderRadius: "50%",
    borderTop: "2vmin solid #555555",
    height: "50vmin",
    margin: "25vmin auto 0px",
    webkitAnimation: "spin 2s linear infinite",
    width: "50vmin"
};

export default class LoadingComponent extends BaseComponent {
    static propTypes = {
        loading: PropTypes.string.isRequired,
        ...BaseComponent.propTypes
    }

    constructor(props) {
        super(props);
        this.renderLoading = this.renderLoading.bind(this);
    }

    renderLoading() {
        if (this.props.loading) {
            return <div style={LOADING_SCREEN_STYLE}>
                <div style={LOADING_STYLE}></div>
            </div>;
        }

        return null;
    }

    render() {
        return this.renderLoading();
    }
}
