// Dependencies
import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

class TextAreaFieldGroup extends Component {
  render() {
    return (
      <div className="form-froup m-3">
        <textarea
          className={classnames("form-control form-control-lg", {
            "is-invalid": this.props.error
          })}
          name={this.props.name}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
        />
        {this.props.info && (
          <small className="form-text text-muted">{this.props.info}</small>
        )}
        {this.props.error && (
          <div className="invalid-feedback">{this.props.error}</div>
        )}
      </div>
    );
  }
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
