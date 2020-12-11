import React from 'react';
import PropTypes from 'prop-types';
import Container from './wrappers';

const Label = ({ children }) => (
  <Container>
    {children}
  </Container>
);

Label.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Label;
