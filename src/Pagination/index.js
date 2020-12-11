import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination as Container } from './wrappers';

const linkModifier = (active) => (active ? 'active' : 'inactive');

const Pagination = (props) => {
  const { activePage, totalOfItems, itemsPerPage, onPageChange } = props;
  const numberOfPages = Math.ceil(totalOfItems / itemsPerPage) || 1;
  const pageNumbers = [...Array(numberOfPages).keys()];
  const canIncreasePage = activePage < numberOfPages;
  const canDecreasePage = activePage > 1;
  return (
    <Container>
      {canDecreasePage && (
        <Container.Prev
          onClick={() => {
            onPageChange(activePage - 1);
          }}
        >
          &laquo;
        </Container.Prev>
      )}
      {pageNumbers.map((i) => {
        const page = i + 1;
        return (
          <Container.Link
            key={page}
            modifiers={linkModifier(page === activePage)}
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </Container.Link>
        );
      })}
      {canIncreasePage && (
        <Container.Next
          onClick={() => {
            onPageChange(activePage + 1);
          }}
        >
          &raquo;
        </Container.Next>
      )}
    </Container>
  );
};

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalOfItems: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
