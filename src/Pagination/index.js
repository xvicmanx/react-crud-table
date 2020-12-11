import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination as Container } from './wrappers';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: props.defaultActivePage,
    };
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handlePreviousClick() {
    const { activePage } = this.state;
    if (activePage > 1) {
      this.update(activePage - 1);
    }
  }

  handleNextClick() {
    const { activePage } = this.state;
    const numberOfPages = this.calculateNumberOfPages();
    if (activePage < numberOfPages) {
      this.update(activePage + 1);
    }
  }

  handleLinkClick(evt) {
    this.update(+evt.target.textContent.trim());
  }

  update(activePage) {
    const { totalOfItems, itemsPerPage, onChange } = this.props;
    this.setState({ activePage });
    onChange({
      activePage,
      totalOfItems,
      itemsPerPage,
    });
  }

  calculateNumberOfPages() {
    const { totalOfItems, itemsPerPage } = this.props;
    return Math.ceil(totalOfItems / itemsPerPage);
  }

  render() {
    const { activePage } = this.state;
    const numberOfPages = this.calculateNumberOfPages();
    const numbers = [...Array(numberOfPages).keys()];
    return (
      <Container>
        <Container.Prev onClick={this.handlePreviousClick}>
          &laquo;
        </Container.Prev>
        {numbers.map((i) => (
          <Container.Link
            key={i}
            modifiers={i === activePage ? 'active' : 'inactive'}
            onClick={this.handleLinkClick}
          >
            {i}
          </Container.Link>
        ))}
        <Container.Next onClick={this.handleNextClick}>&raquo;</Container.Next>
      </Container>
    );
  }
}

Pagination.propTypes = {
  defaultActivePage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  totalOfItems: PropTypes.number,
  onChange: PropTypes.func,
};

Pagination.defaultProps = {
  defaultActivePage: 1,
  totalOfItems: 0,
  itemsPerPage: 10,
  onChange: () => {},
};

export default Pagination;
