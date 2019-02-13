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

  render() {
    const objectValue = Object.values(this.props.data)[0];
    const objectKey = Object.keys(this.props.data)[0];

    //just capitalise objectValue for all dropdowns
    //but detect slider min_price and max_price values and render 'Under' or 'Over'
    //same for seats
    return (
      <div className="active-filter">
        <span>
          {objectValue.substring(0, 1).toUpperCase() +
            objectValue.substring(1, objectValue.length)}
        </span>
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
