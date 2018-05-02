import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  steps: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
};
export default class Breadcrumb extends Component {
  isActive(index) {
    return this.props.active === index;
  }

  handleActiveStyle(index) {
    return this.isActive(index) ? 'form__steps-item--active' : '';
  }

  render() {
    return (
      <ol className="form__steps space-box-medium">
        {
          this.props.steps.map((step, index) => {
            return (
              <li key={`breadcrumb-${index}`} className={`form__steps-item ${this.handleActiveStyle(index)}`}>
                {step.breadcrumbTitle}
              </li>
            );
          })
        }
      </ol>
    );
  }
}

Breadcrumb.propTypes = propTypes;
