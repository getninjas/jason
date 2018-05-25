import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import Button from './Button';
import Factory from './Factory';
import { display, addHeaderMarkup } from '../helpers/step';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  zipcodeUrlService: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  headerMarkup: PropTypes.string,
  visible: PropTypes.bool,
  isLast: PropTypes.bool,
};

const defaultProps = {
  visible: false,
  isLast: false,
};

export default class Step extends Component {
  render() {
    const { buttonText, headerMarkup, fields } = this.props;

    return (
      <fieldset className="form__container inputs" style={{ display: display(this.props.visible) }}>
        { addHeaderMarkup(headerMarkup) }

        {
          fields.map((item, index) =>
            <Field
              key={`field-${index}`}
              label={item.title}
              id={item.id}
              errorMessage={item.errorMessage}
              wrapperStyle={item.wrapperStyle} >
              {
                Factory.getComponent({
                  item,
                  index,
                  onFieldChange: this.props.onFieldChange,
                  formName: this.props.formName,
                  zipcodeUrlService: this.props.zipcodeUrlService,
                })
              }
            </Field>,
          )
        }

        <Button isSubmit={this.props.isLast} handleButtonClick={this.props.onSubmit}>
          {buttonText}
        </Button>
      </fieldset>
    );
  }
}

Step.propTypes = propTypes;
Step.defaultProps = defaultProps;
