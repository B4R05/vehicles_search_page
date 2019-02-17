import _ from "lodash";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Dropdown, Header } from "semantic-ui-react";
import { fetchData, editCriteria } from "../actions";
import DropdownInput from "./DropdownInput";
import ActiveFilterItem from "./ActiveFilterItem";
import "../styles/SearchSummary.css";

import { defaultCriteria } from "../config/minimumCriteria";

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
    // Check if user has interacted with search form
    if (this.props.isCriteriaPristine) {
      // if form is still pristine, don't show active filters
      return;
    }

    // User has interacted with search form, so show all filters being applied.

    let relevantCriteriaKeys = Object.keys(this.props.criteria);

    return relevantCriteriaKeys.map(key => {
      if (
        key !== "vehicle_type" &&
        key !== "page" &&
        key !== "rolling" &&
        key !== "order_by" &&
        key !== "order_direction"
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
    criteria: state.data.criteria,
    isCriteriaPristine: state.data.isCriteriaPristine
  };
};

export default connect(
  mapStateToProps,
  { editCriteria, fetchData }
)(SearchSummary);
