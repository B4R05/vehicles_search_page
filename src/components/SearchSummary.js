import React, { Component } from "react";
import { fetchData, editCriteria } from "../actions";
import { connect } from "react-redux";
import { Dropdown, Header } from "semantic-ui-react";
import DropdownInput from "./DropdownInput";

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

  componentDidMount() {
    //put this in INIT_STATE
    this.props.editCriteria(null, this.state.options[3].value, null, null);
  }

  handleValueChange = (e, data) => {
    console.log(data);
    this.setState({ value: data.value }, () => {
      this.props.editCriteria(null, data.value, null, null);
    });
  };

  showNumberOfCarsAvailable = () => {
    if (this.props.metadata.hasOwnProperty("total_count")) {
      return (
        <Header as="h1">
          {this.props.metadata.total_count} cars available
        </Header>
      );
    }
  };

  render() {
    return (
      <section className="search__summary">
        {this.showNumberOfCarsAvailable()}
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
      </section>
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
