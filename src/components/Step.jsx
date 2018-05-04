import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import Button from './Button';
import Factory from './Factory';

const propTypes = {
  step: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  isValidStep: PropTypes.func,
  formName: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  headerMarkup: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
};

const defaultProps = {
  visible: false,
  isLast: false,
};

export default class Step extends Component {
  constructor() {
    super();

    this.state = {
      step: {},
      valid: true,
    };

    this.handleStepButtonClick = this.handleStepButtonClick.bind(this);
  }

  handleStepButtonClick(evt) {
    this.props.handleButtonClick(evt);
  }

  componentWillMount() {
    this.setState({
      step: this.props.step,
    });
  }

  render() {
    const { button, headerMarkup, fields } = this.props;

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
                errorMessage={item.errorMessage} >

                {
                  Factory.getComponent({
                    item,
                    index,
                    onFieldChange: this.props.onFieldChange,
                    formName: this.props.formName,
                  })
                }
              </Field>
            )
          })
        }

        <Button isSubmit={this.props.isLast} handleButtonClick={this.handleStepButtonClick}>{ button }</Button>
      </fieldset>
    );
  }

  _createMarkup(html) {
    return { __html: html };
  }
}

Step.propTypes = propTypes;
Step.defaultProps = defaultProps;
