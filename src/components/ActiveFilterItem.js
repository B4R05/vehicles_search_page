import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import { editCriteria } from "../actions";
import "../styles/ActiveFilterItem.css";

class ActiveFilterItem extends Component {
  //remove the linked active filter from activeFilters
  //and remove linked property from criteria object to send to backend
  handleIconClick = (objectKey, objectValue) => {
    this.props.editCriteria(objectKey, "");
  };

  capitaliseFirstLetter = objectValue => {
    return (
      objectValue.substring(0, 1).toUpperCase() +
      objectValue.substring(1, objectValue.length)
    );
  };

  //returns the active filter's value in a well-presented rather than in a raw format
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
      if (objectKey === "number_of_weeks") {
        return `${objectValue} weeks`;
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
    //if tags array detected
    if (objectValue instanceof Array) {
      return this.capitaliseFirstLetter(objectValue[0]);
    }
  };

  render() {
    const objectValue = Object.values(this.props.data)[0];
    const objectKey = Object.keys(this.props.data)[0];

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

ActiveFilterItem.propTypes = {
  editCriteria: PropTypes.func.isRequired,
  data: PropTypes.object
};

export default connect(
  null,
  { editCriteria }
)(ActiveFilterItem);
