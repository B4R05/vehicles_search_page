import React from "react";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";
import SearchResultsCard from "./SearchResultsCard";
import SearchPagination from "./SearchPagination";
import "../styles/SearchResults.css";

const SearchResults = props => {
  return (
    <section className="search-results">
      <Card.Group itemsPerRow={3}>
        {props.cars.map(car => (
          <SearchResultsCard info={car} key={car.id} />
        ))}
      </Card.Group>
      <br />
      <SearchPagination />
    </section>
  );
};

const mapStateToProps = state => {
  return {
    cars: state.data.response.data,
    isVehiclesLoading: state.data.isVehiclesLoading
  };
};

export default connect(
  mapStateToProps,
  null
)(SearchResults);
