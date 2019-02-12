import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";
import SearchResultsCard from "./SearchResultsCard";

class SearchResults extends Component {
  render() {
    return (
      <section className="search__results">
        {this.props.isVehiclesLoading ? "Loading..." : "Showing Search Results"}
        <Card.Group itemsPerRow={3}>
          {this.props.cars.map(car => <SearchResultsCard info={car} />)}
        </Card.Group>
      </section>
    );
  }
}

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
