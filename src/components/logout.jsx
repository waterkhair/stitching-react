// Modules
import BaseComponent from "./base";
import PropTypes from "prop-types";
import React from "react";

export default class ConfirmComponent extends BaseComponent {
    static propTypes = {
        onLogout: PropTypes.func,
        ...BaseComponent.propTypes
    }

    componentWillMount() {
        this.stitching.auth
            .logout()
            .then(this.setMessage)
            .then(() => {
                this.props.onLogout();
            });
    }

    render() {
        return (
            <div className={this.state.messageClass}>
                <strong>{this.state.message}</strong>
            </div>
        );
    }
}
