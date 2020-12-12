// @flow
import React, { Component } from 'react';
import { Pagination as Container } from './wrappers';

const linkModifier = (active) => (active ? 'active' : 'inactive');

export type Props = {
  activePage: number,
  itemsPerPage: number,
  totalOfItems: number,
  onPageChange: Function,
};

const Pagination = (props: Props): React$Element<any> => {
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

export default Pagination;
