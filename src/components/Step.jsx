import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import Button from './Button';
import Factory from './Factory';

export default class Step extends Component {
  _createMarkup(html) {
    return { __html: html };
  }

  render() {
    const { fields, button, headerMarkup } = this.props.step;

    return (
      <fieldset className="form__container inputs" style={{ display: this.props.visible ? 'block' : 'none' }}>
        { headerMarkup ? <div dangerouslySetInnerHTML={this._createMarkup(headerMarkup)} /> : '' }

        {
          fields.map((item, index) => {
            return (
              <Field
                key={`field-${index}`}
                label={item.title}
                id={item.id}
                errorMessage='Required field'>

                { Factory.getComponent(item, index) }
              </Field>
            )
          })
        }

        <Button isSubmit={this.props.isLast} handleButtonClick={this.props.handleButtonClick}>{ button }</Button>
      </fieldset>
    );
  }
}

Step.defaultProps = {
  step: [],
  visible: false,
  isLast: false,
}

Step.propTypes = {
  step: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
}
