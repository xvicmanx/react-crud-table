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

const Select = (props: Props): React$Element<'select'> => {
  const { placeholder, options, value, onChange } = props;
  return (
    <select className="crud-table__select" onChange={onChange} value={value}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.key} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Select;
