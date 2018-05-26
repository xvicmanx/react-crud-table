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
    };
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  update(activePage) {
    this.setState({ activePage });
    this.props.onChange({
      activePage,
      numberOfPages: this.props.numberOfPages,
    });
  }

  handlePreviousClick() {
    if (this.state.activePage > 1) {
      this.update(this.state.activePage - 1);
    }
  }

  handleNextClick() {
    if (this.state.activePage < this.props.numberOfPages) {
      this.update(this.state.activePage + 1);
    }
  }
  
  handleLinkClick(evt) {
    this.update(+evt.target.textContent.trim());
  }
  
  render() {
    const numbers = numbersTo(this.props.numberOfPages);
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
  numberOfPages: PropTypes.number,
  onChange: PropTypes.func,
};

Pagination.defaultProps = {
  defaultActivePage: 1,
  numberOfPages: 0,
  onChange: () => {},
};

export default Pagination;