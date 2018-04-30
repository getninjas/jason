import React from 'react';
import PropTypes from 'prop-types';

export default class Breadcrumb extends React.Component {
  static defaultProps = {
    steps: []
  }

  render() {
    return (
      <div className="breadcrumb">
        <ol className="form__steps space-box-medium">
          {
            this.props.steps.map((step, index) => {
              return (
                <li key={`breadcrumb-${index}`} className="form__steps-item form__steps-item--active">
                  {step.breadcrumbTitle}
                </li>
              );
            })
          }
        </ol>
      </div>
    );
  }
}

Breadcrumb.propTypes = {
  steps: PropTypes.array.isRequired,
}
