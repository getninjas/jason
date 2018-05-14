import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import Button from './Button';
import Factory from './Factory';

const propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
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
  display({ visible }) {
    return visible ? 'block' : 'none';
  }

  addHeaderMarkup(headerMarkup) {
    return headerMarkup ? <div className="__headerMarkup__" dangerouslySetInnerHTML={this._createMarkup(headerMarkup)} /> : '';
  }

  render() {
    const { buttonText, headerMarkup, fields } = this.props;

    return (
      <fieldset className="form__container inputs" style={{ display: this.display(this.props) }}>
        { this.addHeaderMarkup(headerMarkup) }

        {
          fields.map((item, index) => {
            return (
              <Field
                key={`field-${index}`}
                label={item.title}
                id={item.id}
                errorMessage={item.errorMessage}>
                {
                  Factory.getComponent({
                    item,
                    index,
                    onFieldChange: this.props.onFieldChange,
                    formName: this.props.formName,
                    zipcodeUrlService: this.props.zipcodeUrlService
                  })
                }
              </Field>
            )
          })
        }

        <Button isSubmit={this.props.isLast} handleButtonClick={this.props.handleButtonClick}>{buttonText}</Button>
      </fieldset>
    );
  }

  _createMarkup(html) {
    return { __html: html };
  }
}

Step.propTypes = propTypes;
Step.defaultProps = defaultProps;
