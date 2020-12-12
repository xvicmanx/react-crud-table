// @flow

import * as React from 'react';
import Container from './wrappers';

export type Props = {
  children?: Array<any> | number | string | React.Element<any>,
};

const Label = (props: Props): React.Element<any> => {
  const { children } = props;
  return <Container>{children}</Container>;
};

export default Label;
