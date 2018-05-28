import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.handleChange = this.handleChange.bind(this);
  }
  

  handleChange(evt) {
    this.props.onChange(
      evt,
      {
        value: evt.target.value,
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  render() {
    return (
      <select
        onChange={this.handleChange}
      >
       <option
        value=""
        selected={!this.state.value}
      >
        {this.props.placeholder}
      </option>
      {this.props.options.map(option => (
        <option
          key={option.key}
          value={option.value}
        >
          {option.text}
         </option>
      ))}
      </select>
    );
  }
}

Select.propTypes = {
  value: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any,
      value: PropTypes.any,
      text: PropTypes.any,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;