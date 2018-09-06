import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
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
  nestedProperties: PropTypes.object,
  nestedValues: PropTypes.object,
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
      nested: {
        values: [{
          databaseId: '',
          value: this.props.nestedProperties.mask,
        }],
      },
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(evt) {
    const nested = Object.assign({}, this.props.nestedValues);
    const nestedSelectedValues = nested[`${evt.value}`].values;

    this.setState({ nested: { values: nestedSelectedValues } });
  }

  render() {
    const {
      id,
      name,
      nestedProperties,
      onFieldBlur,
      onFieldChange,
      placeholder,
      required,
      style,
      selected,
      values } = this.props;

    return (
      <Fragment>
        <Select
          key={id}
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
        <div className={'form__field form__field--fluid input'}>
          <label className={'form_label'}>{nestedProperties.label}</label>
          <Select
            key={nestedProperties.name}
            id={nestedProperties.name}
            name={nestedProperties.name}
            onFieldBlur={onFieldBlur}
            onFieldChange={onFieldChange}
            placeholder={nestedProperties.mask}
            values={[...this.state.nested.values]}
          />
        </div>
      </Fragment>
    );
  }
}

SelectCategory.propTypes = propTypes;
SelectCategory.defaultProps = defaultProps;
