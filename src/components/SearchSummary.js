import React, { Component, Fragment } from "react";
import { fetchData, editCriteria, removeActiveFilter } from "../actions";
import { connect } from "react-redux";
import { Dropdown, Header } from "semantic-ui-react";
import DropdownInput from "./DropdownInput";
import ActiveFilterItem from "./ActiveFilterItem";

class SearchSummary extends Component {
  state = {
    value: { order_direction: "asc", order_by: "recommended" },
    options: [
      {
        key: "price_low_to_high",
        value: { order_direction: "asc", order_by: "price" },
        text: "Price - Low To High"
      },
      {
        key: "price_high_to_low",
        value: { order_direction: "desc", order_by: "price" },
        text: "Price - High To Low"
      },
      {
        key: "distance",
        value: { order_direction: "asc", order_by: "distance" },
        text: "Distance - Close To Far"
      },
      {
        key: "recommended",
        value: { order_direction: "asc", order_by: "recommended" },
        text: "Recommended"
      }
    ]
  };

  handleValueChange = (e, data) => {
    this.setState({ value: data.value }, () => {
      this.props.editCriteria(null, data.value, null, null);
    });
  };

  showNumberOfCarsAvailable = () => {
    return this.props.isVehiclesLoading
      ? "Searching for cars"
      : `${this.props.metadata.total_count} cars available`;
  };

  renderActiveFilters = () => {
    return this.props.activeFilters.map((filter, i) => (
      <ActiveFilterItem data={filter} key={i} />
    ));
  };

  render() {
    return (
      <Fragment>
        <section className="search__summary">
          <Header as="h1">{this.showNumberOfCarsAvailable()}</Header>
          <Dropdown
            search
            selection
            name="order_by"
            value={this.state.value}
            onChange={(e, data) => {
              this.handleValueChange(e, data);
            }}
            options={this.state.options}
          />
        </section>{" "}
        <div className="active-filter-container">
          {this.renderActiveFilters()}
        </div>
      </Fragment>
    );
  }
}
// <h5 onClick={() => this.props.removeActiveFilter("")}>
//   {this.props.activeFilters.length && "Clear filters"}
// </h5>

const mapStateToProps = state => {
  return {
    metadata: state.data.response.metadata,
    isVehiclesLoading: state.data.isVehiclesLoading,
    criteria: state.data.criteria,
    activeFilters: state.data.activeFilters
  };
};

export default connect(
  mapStateToProps,
  { editCriteria, removeActiveFilter, fetchData }
)(SearchSummary);
