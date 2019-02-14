import _ from "lodash";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchData, editCriteria } from "../actions";
import SearchFormRadio from "./SearchFormRadio";
import Slider from "./Slider";
import DropdownInput from "./DropdownInput";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extraSearchFiltersShown: false,
      mobileWidth: false,
      seeSearchFilters: false
    };
  }

  componentDidMount() {
    //make an initial request. (The criteria object is in the redux store)
    //Objective: populate the dropdowns values with the response.metadata
    this.props.fetchData();

    //dynamically detect the window size
    window.addEventListener("resize", this.detectMobileWidth);
    //detect if user is in a mobile width at runtime
    this.detectMobileWidth();
  }

  componentDidUpdate(prevProps, prevState) {
    //if the criteria have changed, fetch data with new criteria
    //lodash.isEqual performs a DEEP comparison of objects
    if (!_.isEqual(prevProps.criteria, this.props.criteria)) {
      this.props.fetchData();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.detectMobileWidth);
  }

  detectMobileWidth = () => {
    if (window.innerWidth <= 767) {
      this.setState({ mobileWidth: true });
    } else {
      this.setState({ mobileWidth: false });
    }
  };

  populateDropdown = type => {
    //takes metadata from backend and returns an array in the format compatible with the dropdown of semantic ui
    //this is used to populate dropdowns with server metadata

    if (this.props.metadata.aggregations.hasOwnProperty(type)) {
      if (type === "year") {
        return Object.keys(this.props.metadata.aggregations[type]).map(e => {
          return {
            key: e,
            value: parseInt(e), //backend wants the value to be an integer
            text: `${e} (${this.props.metadata.aggregations[type][e]})`
          };
        });
      } else {
        return Object.keys(this.props.metadata.aggregations[type]).map(e => {
          return {
            key: e,
            value: e,
            text: `${e.substring(0, 1).toUpperCase() +
              e.substring(1, e.length)} (${
              this.props.metadata.aggregations[type][e]
            })` //capitalise first character of e
          };
        });
      }
    } else {
      return [];
    }
  };

  showHideExtraSearchFilters = () => {
    if (this.state.extraSearchFiltersShown) {
      this.setState({ extraSearchFiltersShown: false });
    } else {
      this.setState({ extraSearchFiltersShown: true });
    }
  };

  renderExtraSearchFilters = () => {
    if (
      this.state.extraSearchFiltersShown &&
      this.props.criteria.vehicle_type === "Consumer"
    ) {
      return (
        <Fragment>
          <DropdownInput
            label="Duration"
            name="number_of_months"
            stateOptions={[
              { key: "2", value: 2, text: "2 Months" },
              { key: "3", value: 3, text: "3 Months" },
              { key: "4", value: 4, text: "4 Months" }
            ]}
          />

          <DropdownInput
            label="Subsciption"
            name="subscription_start_days"
            stateOptions={[
              { key: "30", value: 30, text: "Next 30 Days" },
              { key: "14", value: 14, text: "Next 14 Days" },
              { key: "2", value: 2, text: "Next 2 Days" }
            ]}
          />

          <DropdownInput
            label="Location"
            name="location"
            stateOptions={[
              { key: "London", value: "London, UK", text: "London, UK" }
            ]}
          />

          <DropdownInput
            label="Distance"
            name="max_distance"
            stateOptions={[
              { key: "1000", value: 1000, text: "Nationwide" },
              { key: "25", value: 25, text: "25 miles" },
              { key: "50", value: 50, text: "50 miles" },
              { key: "75", value: 75, text: "75 miles" }
            ]}
          />

          <DropdownInput
            label="Year"
            name="year"
            stateOptions={[
              { key: "ANY", value: 0, text: "Any" },
              ...this.populateDropdown("year")
            ]}
          />

          <DropdownInput
            label="Car Type"
            name="tags"
            stateOptions={[
              { key: "ANY", value: "Any", text: "Any" },
              ...this.populateDropdown("tags")
            ]}
          />

          <DropdownInput
            label="Body Type"
            name="body_type"
            stateOptions={[
              { key: "ANY", value: "Any", text: "Any" },
              ...this.populateDropdown("body_information")
            ]}
          />
        </Fragment>
      );
    }

    if (
      this.state.extraSearchFiltersShown &&
      this.props.criteria.vehicle_type === "PCO"
    ) {
      return (
        <Fragment>
          <DropdownInput
            label="Location"
            name="location"
            stateOptions={[
              { key: "London", value: "London, UK", text: "London, UK" }
            ]}
          />

          <DropdownInput
            label="Distance"
            name="max_distance"
            stateOptions={[
              { key: "1000", value: 1000, text: "Nationwide" },
              { key: "25", value: 25, text: "25 miles" },
              { key: "50", value: 50, text: "50 miles" },
              { key: "75", value: 75, text: "75 miles" }
            ]}
          />

          <DropdownInput
            label="Year"
            name="year"
            stateOptions={[
              { key: "ANY", value: 0, text: "Any" },
              ...this.populateDropdown("year")
            ]}
          />

          <DropdownInput
            label="Body Type"
            name="body_type"
            stateOptions={[
              { key: "ANY", value: "Any", text: "Any" },
              ...this.populateDropdown("body_information")
            ]}
          />
        </Fragment>
      );
    }
  };

  renderAllSearchFilters = () => {
    if (
      (!this.state.mobileWidth || this.state.seeSearchFilters) &&
      this.props.criteria.vehicle_type === "Consumer"
    ) {
      return (
        <Fragment>
          <Slider
            type="budget"
            label="Monthly Budget"
            minName="price_min"
            maxName="price_max"
          />

          <DropdownInput
            label="Car Make"
            name="vehicle_make"
            stateOptions={[
              { key: "ANY", value: "Any", text: "Any" },
              ...this.populateDropdown("vehicle_make")
            ]}
          />
          <DropdownInput
            label="Car Model"
            name="vehicle_model_group"
            disabled={
              !this.props.criteria.hasOwnProperty("vehicle_make") && true
            }
            stateOptions={[
              { key: "ANY", value: "Any", text: "Any" },
              ...this.populateDropdown("vehicle_model_group")
            ]}
          />
          <DropdownInput
            label="Gearbox"
            name="transmission"
            stateOptions={[
              { key: "ANY", value: "Any", text: "Any" },
              ...this.populateDropdown("transmission")
            ]}
          />

          <Slider
            type="seats"
            label="Number Of Seats"
            minName="number_of_seats_min"
            maxName="number_of_seats_max"
          />

          <DropdownInput
            label="Fuel Type"
            name="fuel"
            stateOptions={[
              { key: "ANY", value: "Any", text: "Any" },
              ...this.populateDropdown("fuel")
            ]}
          />

          {this.renderExtraSearchFilters()}

          <h5 onClick={this.showHideExtraSearchFilters}>
            {this.state.extraSearchFiltersShown
              ? "See less filters"
              : "See more filters"}
          </h5>
        </Fragment>
      );
    }

    if (
      (!this.state.mobileWidth || this.state.seeSearchFilters) &&
      this.props.criteria.vehicle_type === "PCO"
    ) {
      return (
        <Fragment>
          <SearchFormRadio />

          <Slider
            type="budget"
            label="Weekly Budget"
            minName="price_min"
            maxName="price_max"
          />

          <DropdownInput
            label="City Jurisdiction"
            name="city_jurisdiction"
            stateOptions={[
              { key: "Any", value: "Any", text: "Any" },
              ...this.populateDropdown("city_jurisdiction")
            ]}
          />

          <DropdownInput
            label="Uber Type"
            name="sub_type"
            stateOptions={[
              { key: "Any", value: "Any", text: "All" },
              ...this.populateDropdown("sub_type")
            ]}
          />

          <DropdownInput
            label="Car Make"
            name="vehicle_make"
            stateOptions={[
              { key: "ANY", value: "Any", text: "Any" },
              ...this.populateDropdown("vehicle_make")
            ]}
          />
          <DropdownInput
            label="Car Model"
            name="vehicle_model_group"
            disabled={
              !this.props.criteria.hasOwnProperty("vehicle_make") && true
            }
            stateOptions={[
              { key: "ANY", value: "Any", text: "Any" },
              ...this.populateDropdown("vehicle_model_group")
            ]}
          />
          <DropdownInput
            label="Gearbox"
            name="transmission"
            stateOptions={[
              { key: "ANY", value: "Any", text: "Any" },
              ...this.populateDropdown("transmission")
            ]}
          />

          <Slider
            type="seats"
            label="Number Of Seats"
            minName="number_of_seats_min"
            maxName="number_of_seats_max"
          />

          <DropdownInput
            label="Fuel Type"
            name="fuel"
            stateOptions={[
              { key: "ANY", value: "Any", text: "Any" },
              ...this.populateDropdown("fuel")
            ]}
          />

          {this.renderExtraSearchFilters()}

          <h5 onClick={this.showHideExtraSearchFilters}>
            {this.state.extraSearchFiltersShown
              ? "See less filters"
              : "See more filters"}
          </h5>
        </Fragment>
      );
    }
  };

  toggleSearchFiltersAtMobileWidths = () => {
    if (this.state.seeSearchFilters) {
      this.setState({ seeSearchFilters: false });
    } else {
      this.setState({ seeSearchFilters: true });
    }
  };

  render() {
    return (
      <aside className="search__form">
        {this.state.mobileWidth && (
          <h5 onClick={this.toggleSearchFiltersAtMobileWidths}>
            {this.state.seeSearchFilters ? "Close" : "See search filters"}
          </h5>
        )}
        {this.renderAllSearchFilters()}
      </aside>
    );
  }
}

// {this.state.mobileWidth && (
//   <div
//     style={{
//       background: "rgb(80, 255, 125)",
//       width: "50%",
//       cursor: "pointer",
//       textAlign: "center",
//       position: "fixed",
//       zIndex: 10,
//       bottom: 0,
//       padding: 10
//     }}
//     onClick={this.toggleSearchFiltersAtMobileWidths}
//   >
//     <h3>
//       {this.state.seeSearchFilters
//         ? "Update search and hide filters"
//         : "Refine your search"}
//     </h3>
//   </div>
// )}

const mapStateToProps = state => {
  return {
    metadata: state.data.response.metadata,
    isVehiclesLoading: state.data.isVehiclesLoading,
    criteria: state.data.criteria
  };
};

export default connect(
  mapStateToProps,
  { fetchData, editCriteria }
)(SearchForm);
