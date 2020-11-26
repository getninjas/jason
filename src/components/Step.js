import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import Button from './Button';
import Factory from './Factory';
import { display } from '../helpers/step';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFieldBlur: PropTypes.func.isRequired,
  zipcodeUrlService: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  headerMarkup: PropTypes.string,
  visible: PropTypes.bool,
  isLast: PropTypes.bool,
  buttonCustomClasses: PropTypes.string,
  isFirst: PropTypes.bool,
  handleBackButton: PropTypes.func,
  backButtonCustomClasses: PropTypes.string,
  backButtonText: PropTypes.string,
  enableBackButton: PropTypes.bool,
};

const defaultProps = {
  visible: false,
  isLast: false,
  buttonCustomClasses: '',
  backButtonCustomClasses: '',
  backButtonText: 'Back',
  enableBackButton: false,
};

export default class Step extends Component {
  render() {
    const {
      buttonText,
      fields,
      buttonCustomClasses,
      backButtonCustomClasses,
      backButtonText,
      visible,
      onFieldChange,
      onFieldBlur,
      formName,
      zipcodeUrlService,
      isLast,
      onSubmit,
      enableBackButton,
      isFirst,
      handleBackButton,
    } = this.props;

    return (
      <fieldset className="form__container inputs" style={{ display: display(visible) }}>
        {
          fields.map((item, index) =>
            <Field
              key={`field-${index}`}
              label={item.title}
              id={item.id}
              errorMessage={item.errorMessage}
              wrapperClassName={item.wrapperClassName} >
              {
                Factory.getComponent({
                  item,
                  index,
                  onFieldChange,
                  onFieldBlur,
                  formName,
                  zipcodeUrlService,
                })
              }
            </Field>,
          )
        }

        <div className="form__actions">
          {enableBackButton && !isFirst && <Button
            isSubmit={false}
            handleButtonClick={handleBackButton}
            buttonCustomClasses={backButtonCustomClasses}
          >
            {backButtonText}
          </Button>}

          <Button
            isSubmit={isLast}
            handleButtonClick={onSubmit}
            buttonCustomClasses={buttonCustomClasses}
          >
            {buttonText}
          </Button>
        </div>

      </fieldset>
    );
  }
}

Step.propTypes = propTypes;
Step.defaultProps = defaultProps;
