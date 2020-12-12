// @flow
import React from 'react';
import Container from './wrappers';

export type Props = {
  children?: Array<any> | number | string | React.Element,
};

const Label = (props: Props) => {
  const { children } = props;
  return <Container>{children}</Container>;
};

export default Label;
