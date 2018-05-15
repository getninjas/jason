import React, { Component } from 'react';
import PropTypes from 'prop-types';
import addPlaceholder from '../helpers/select';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  selected: PropTypes.any,
  value: PropTypes.string,
  values: PropTypes.array,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.string,
};

const defaultProps = {
  id: '',
  selected: '',
  name: '',
  title: '',
  required: false,
  values: [],
  placeholder: '',
  style: 'form__input',
};

export default class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      selected: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const values = addPlaceholder(this.props);

    this.setState({ values });
  }

  onChange(evt) {
    this.props.onFieldChange({
      value: evt.target.value,
      id: this.props.id,
      required: this.props.required,
      type: this.props.type,
    });

    this.setState({ value: evt.target.value });
  }

  render() {
    const { id, name, selected, required, style } = this.props;

    return (
      <select
        id={id}
        name={name}
        defaultValue={selected}
        className={style}
        onChange={this.onChange}
        required={required ? 'true' : 'false'}>
        {
          this.state.values.map((item, index) =>
            (
              <option key={`option-${index}`} value={item.databaseId}>
                {item.value}
              </option>
            ),
          )
        }
      </select>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;
