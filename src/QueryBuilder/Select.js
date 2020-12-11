// @flow

import React, { Component } from 'react';

type Option = {
  key: string | number,
  value: string | number,
  text: string,
};
type Props = {
  value: ?string | ?number,
  options: Array<Option>,
  placeholder: string,
  onChange: Function,
};

type State = {
  value: ?string | ?number,
};

class Select extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: props.value };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { value } = this.props;
    if (nextProps.value !== value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange(evt: SyntheticEvent<HTMLSelectElement>) {
    const { onChange } = this.props;
    onChange(
      evt,
      { value: evt.currentTarget.value },
    );
  }

  render(): React$Element<'select'> {
    const { value } = this.state;
    const { placeholder, options } = this.props;
    return (
      <select onChange={this.handleChange.bind(this)}>
        <option
          value=""
          selected={!value}
        >
          {placeholder}
        </option>
        {options.map((option) => (
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

export default Select;
