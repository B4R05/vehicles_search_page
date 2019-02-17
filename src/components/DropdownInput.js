import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { editCriteria } from "../actions";
import "../styles/DropdownInput.css";

class DropdownInput extends Component {
  state = {
    value: null
  };

  componentDidMount() {
    //the user should see the first option's value. in most cases 'Any'.
    this.setState({ value: this.props.stateOptions[0].value });
  }

  componentDidUpdate(prevProps, prevState) {
    //is DropdownInput's name found in the criteria object ? show 'Any' or the first dropdown option's value
    //to the user
    //this is done so that when we delete an ActiveFilterItem, we want its related DropdownInput value to
    //change accordingly
    if (
      !this.props.criteria.hasOwnProperty(this.props.name) &&
      prevProps !== this.props
    ) {
      this.setState({ value: this.props.stateOptions[0].value });
    }
  }

  handleValueChange = (e, data) => {
    //we do not want to send the 'Any' value to the backend as it will return no results
    //we want to send "" instead but show 'Any' to the user
    if (data.value === "Any")
      this.setState({ value: "Any" }, () => {
        this.props.editCriteria(data.name, "");
      });
    else
      this.setState({ value: data.value }, () => {
        this.props.editCriteria(data.name, data.value);
      });
  };

  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <Dropdown
          value={this.state.value}
          name={this.props.name}
          disabled={this.props.disabled}
          onChange={(e, data) => {
            this.handleValueChange(e, data);
          }}
          placeholder="State"
          search
          selection
          options={this.props.stateOptions}
        />
      </div>
    );
  }
}

DropdownInput.propTypes = {
  criteria: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  stateOptions: PropTypes.array.isRequired,
  editCriteria: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    criteria: state.data.criteria
  };
};

export default connect(
  mapStateToProps,
  { editCriteria }
)(DropdownInput);
