import React from 'react';
import PropTypes from 'prop-types';

export default class Breadcrumb extends React.Component {
  render() {
    return (
      <ol className="form__steps space-box-medium">
        {
          this.props.steps.map((step, index) => {
            return (
              <li key={`breadcrumb-${index}`} className={`form__steps-item ${this.props.active === index ? 'form__steps-item--active' : ''}`}>
                {step.breadcrumbTitle}
              </li>
            );
          })
        }
      </ol>
    );
  }
}

Breadcrumb.defaultProps = {
  steps: [],
  active: 0
}

Breadcrumb.propTypes = {
  steps: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
}
