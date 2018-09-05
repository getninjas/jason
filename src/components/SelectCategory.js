import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import addPlaceholder from '../helpers/select';
import Select from './Select';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFieldBlur: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  selected: PropTypes.any,
  initialValue: PropTypes.any,
  values: PropTypes.array,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.string,
  nested: PropTypes.array,
};

const defaultProps = {
  id: '',
  name: '',
  title: '',
  required: false,
  initialValue: '',
  values: [],
  placeholder: '',
  style: 'form__input',
};

export default class SelectCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      value: this.props.initialValue ? this.props.initialValue : '',
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const values = addPlaceholder(this.props);

    this.setState({ values });
  }

  onChange(evt) {
    console.log('Event >>>> ', evt);
  }

  render() {
    const { id, name, required, placeholder, values, style, selected, onFieldBlur, onFieldChange, nested } = this.props;

    console.log('Nested Select Category >>>>> ', nested[0]);

    return (
      <Fragment>
        <Select
          id={id}
          name={name}
          onFieldBlur={onFieldBlur}
          onFieldChange={this.onChange}
          placeholder={placeholder}
          required={required}
          selected={selected}
          style={style}
          values={values}
        />
        <Select
          id={nested[0].reference}
          name={nested[0].name}
          onFieldBlur={onFieldBlur}
          onFieldChange={onFieldChange}
          placeholder={nested[0].placeholder}
          required={nested[0].required}
          selected={selected}
          style={style}
          values={nested[0].values}
        />
      </Fragment>
    );
  }
}

SelectCategory.propTypes = propTypes;
SelectCategory.defaultProps = defaultProps;
