import React, { Component } from "react";
import { connect } from "react-redux";
import { removeActiveFilter, editCriteria } from "../actions";
import { Icon } from "semantic-ui-react";

class ActiveFilterItem extends Component {
  handleIconClick = (objectKey, objectValue) => {
    console.log(objectKey);
    console.log(objectValue);
    this.props.editCriteria(objectKey, "");
    this.props.removeActiveFilter(objectValue);
  };

  capitaliseFirstLetter = objectValue => {
    return (
      objectValue.substring(0, 1).toUpperCase() +
      objectValue.substring(1, objectValue.length)
    );
  };

  returnActiveFilterValue = () => {
    const objectValue = Object.values(this.props.data)[0];
    const objectKey = Object.keys(this.props.data)[0];

    //if objectKey's value is expected to be a string, capitalise first letter then return objectvalue
    if (typeof objectValue === "string") {
      return this.capitaliseFirstLetter(objectValue);
    }

    if (typeof objectValue === "number") {
      //slider min and max values
      if (objectKey === "number_of_seats_min") {
        return `Minimum ${objectValue} seats`;
      }
      if (objectKey === "number_of_seats_max") {
        return `Maximum ${objectValue} seats`;
      }
      if (objectKey === "price_min") {
        return `Over £${objectValue}`;
      }
      if (objectKey === "price_max") {
        return `Under £${objectValue}`;
      }

      //months values
      if (objectKey === "number_of_months") {
        return `${objectValue} months`;
      }
      //days values
      if (objectKey === "subscription_start_days") {
        return `Next ${objectValue} days`;
      }
      //miles range
      if (objectKey === "max_distance") {
        return `Within ${objectValue} miles`;
      }
      //year
      if (objectKey === "year") {
        if (objectValue === 0) {
          return "Any Year";
        }
        return `${objectValue}`;
      }
    }

    if (objectValue instanceof Array) {
      return this.capitaliseFirstLetter(objectValue[0]);
    }

    //
    //
    //ARRAY
    //tags
  };

  render() {
    const objectValue = Object.values(this.props.data)[0];
    const objectKey = Object.keys(this.props.data)[0];
    console.log(this.props.data);
    console.log(objectKey);
    console.log(objectValue);

    //just capitalise objectValue for all dropdowns
    //but detect slider min_price and max_price values and render 'Under' or 'Over'
    //same for seats
    //year type distance duration throw errrors
    return (
      <div className="active-filter">
        <span>{this.returnActiveFilterValue()}</span>
        <Icon onClick={() => this.handleIconClick(objectKey, objectValue)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            width="17px"
            height="17px"
            className="icons-hover"
            fill="none"
            stroke="#001EFF"
            strokeLinejoin="round"
            strokeWidth="3.7333333333333325px"
          >
            <title>drover_small_icons</title>
            <g id="Layer_4" data-name="Layer 4">
              <line
                x1="34"
                y1="34"
                x2="6"
                y2="6"
                style={{
                  fill: "none",
                  stroke: "rgb(0, 30, 255)",
                  strokeLinejoin: "round",
                  strokeWidth: "3.73333px"
                }}
              />
              <line
                x1="34"
                y1="6"
                x2="6"
                y2="34"
                style={{
                  fill: "none",
                  stroke: "rgb(0, 30, 255)",
                  strokeLinejoin: "round",
                  strokeWidth: "3.73333px"
                }}
              />
            </g>
          </svg>
        </Icon>
      </div>
    );
  }
}

export default connect(
  null,
  { removeActiveFilter, editCriteria }
)(ActiveFilterItem);
