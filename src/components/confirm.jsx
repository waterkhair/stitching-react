// Modules
import BaseComponent from "./base";
import PropTypes from "prop-types";
import React from "react";

export default class ConfirmComponent extends BaseComponent {
    static propTypes = {
        token: PropTypes.string,
        tokenId: PropTypes.string,
        ...BaseComponent.propTypes
    }

    componentWillMount() {
        this.stitching.auth
            .emailConfirm(this.props.tokenId, this.props.token)
            .then(this.setMessage)
            .catch((err) => {
                this.setError(err);
            })
            .then(() => {
                this.enableComponent();
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
