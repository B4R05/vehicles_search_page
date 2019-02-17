import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Segment } from "semantic-ui-react";
import SearchResultsCard from "./SearchResultsCard";
import SearchPagination from "./SearchPagination";
import "../styles/SearchResults.css";

const SearchResults = props => {
  return (
    <section className="search-results">
      <Segment loading={props.isVehiclesLoading}>
        <Card.Group itemsPerRow={3}>
          {props.cars.map(car => (
            <SearchResultsCard info={car} key={car.id} />
          ))}
        </Card.Group>
      </Segment>
      <br />
      <SearchPagination />
    </section>
  );
};

SearchResults.propTypes = {
  cars: PropTypes.array,
  isVehiclesLoading: PropTypes.bool
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
