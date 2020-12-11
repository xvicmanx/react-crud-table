import React from 'react';
import PropTypes from 'prop-types';
import Container from './wrappers';

const Label = ({ children }) => <Container>{children}</Container>;

Label.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Label;
