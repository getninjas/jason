import React from 'react';
import PropTypes from 'prop-types';

export default class Breadcrumb extends React.Component {
  isActive(index) {
    return this.props.active === index;
  }

  handleActiveSyle(index) {
    return this.isActive(index)? 'form__steps-item--active' : '';
  }

  render() {
    return (
      <ol className="form__steps space-box-medium">
        {
          this.props.steps.map((step, index) => {
            return (
              <li key={`breadcrumb-${index}`} className={`form__steps-item ${this.handleActiveSyle(index)}`}>
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
