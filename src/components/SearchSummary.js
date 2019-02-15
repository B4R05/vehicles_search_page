import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Dropdown, Header } from "semantic-ui-react";
import { fetchData, editCriteria } from "../actions";
import DropdownInput from "./DropdownInput";
import ActiveFilterItem from "./ActiveFilterItem";
import "../styles/SearchSummary.css";

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

  //edit criteria object with state value to send to backend
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
    return Object.keys(this.props.criteria).map(key => {
      if (
        key !== "vehicle_type" &&
        key !== "page" &&
        key !== "rolling" &&
        key !== "order_by" &&
        key !== "order_direction"
        // && (Object.keys(this.props.criteria).length > 2 &&
        //   this.props.criteria.hasOwnProperty("vehicle_type") &&
        //   this.props.criteria.hasOwnProperty("subscription_start_days"))
      ) {
        return (
          <ActiveFilterItem
            data={{ [key]: this.props.criteria[key] }}
            key={key}
          />
        );
      }
    });
  };

  render() {
    return (
      <Fragment>
        <section className="search-summary">
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
        <div className="search-summary__active-filters">
          {this.renderActiveFilters()}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    metadata: state.data.response.metadata,
    isVehiclesLoading: state.data.isVehiclesLoading,
    criteria: state.data.criteria
  };
};

export default connect(
  mapStateToProps,
  { editCriteria, fetchData }
)(SearchSummary);
