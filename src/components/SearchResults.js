import React, { Component } from "react";
import { connect } from "react-redux";
import { editCriteria } from "../actions";
import { Card, Pagination, Segment } from "semantic-ui-react";
import SearchResultsCard from "./SearchResultsCard";

class SearchResults extends Component {
  state = { activePage: 1 };

  handlePaginationChange = (e, { activePage }) =>
    this.setState({ activePage }, () =>
      this.props.editCriteria("page", activePage)
    );

  calculateTotalPages = () => {
    const carsPerPage =
      this.props.metadata.total_count / this.props.metadata.per_page;
    const totalPagesToShow = Math.ceil(carsPerPage);
    return totalPagesToShow;
  };

  componentDidUpdate() {
    const options = { top: 0, left: 0, behavior: "smooth" };
    window.scrollTo(options);
  }

  // calculateNumberOfResultsToShow = () => {
  //   return `Showing ${activePage}-${activePage * 10} results of ${
  //     this.props.metadata.total_count
  //   } results`;
  // };

  render() {
    this.calculateTotalPages();
    const { activePage } = this.state;

    return (
      <section className="search__results">
        <Card.Group itemsPerRow={3}>
          {this.props.cars.map(car => (
            <SearchResultsCard info={car} key={car.id} />
          ))}
        </Card.Group>

        <br />
        {this.props.cars.length ? (
          <Pagination
            activePage={activePage}
            boundaryRange={0}
            onPageChange={this.handlePaginationChange}
            totalPages={this.calculateTotalPages()}
          />
        ) : (
          <span />
        )}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    cars: state.data.response.data,
    metadata: state.data.response.metadata,
    isVehiclesLoading: state.data.isVehiclesLoading,
    activeFilters: state.data.activeFilters
  };
};

export default connect(
  mapStateToProps,
  { editCriteria }
)(SearchResults);
