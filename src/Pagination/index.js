import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination as Container } from './wrappers';

const numbersTo = (n) => {
  const numbers = [];
  for (let i = 0; i < n; i++) { 
    numbers.push(i+1);
  }
  return numbers;
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: props.defaultActivePage,
      totalOfItems: props.totalOfItems,
    };
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.totalOfItems !== this.props.totalOfItems) {
      this.setState({
        totalOfItems: nextProps.totalOfItems,
      });
    }
  }
  
  

  update(activePage) {
    this.setState({ activePage });
    this.props.onChange({
      activePage,
      totalOfItems: this.props.totalOfItems,
      itemsPerPage: this.props.itemsPerPage,
    });
  }

  calculateNumberOfPages() {
    return Math.ceil(this.props.totalOfItems/this.props.itemsPerPage);
  }

  handlePreviousClick() {
    if (this.state.activePage > 1) {
      this.update(this.state.activePage - 1);
    }
  }

  handleNextClick() {
    const numberOfPages = this.calculateNumberOfPages();
    if (this.state.activePage < numberOfPages) {
      this.update(this.state.activePage + 1);
    }
  }
  
  handleLinkClick(evt) {
    this.update(+evt.target.textContent.trim());
  }
  
  render() {
    const numberOfPages = this.calculateNumberOfPages();
    const numbers = numbersTo(numberOfPages);
    return (
      <Container>
        <Container.Prev onClick={this.handlePreviousClick}>
          &laquo;
        </Container.Prev>
        {numbers.map(i => (
          <Container.Link
            modifiers={i === this.state.activePage ? 'active' : 'inactive'}
            onClick={this.handleLinkClick}
          >
            {i}
          </Container.Link>
        ))}
        <Container.Next onClick={this.handleNextClick}>
          &raquo;
        </Container.Next>
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