import React, { Component } from "react";
import { connect } from "react-redux";
import { editCriteria } from "../actions";
import { Dropdown } from "semantic-ui-react";

class DropdownInput extends Component {
  state = {
    value: null
  };

  componentDidMount() {
    if (this.props.stateOptions[0].value === "Any") {
      this.setState({ value: this.props.stateOptions[0].value }, () => {
        //put this in INIT_STATE ?
        this.props.editCriteria(this.props.name, "");
      });
    } else {
      this.setState({ value: this.props.stateOptions[0].value }, () => {
        //put this in INIT_STATE ?
        this.props.editCriteria(
          this.props.name,
          this.props.stateOptions[0].value
        );
      });
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

  // displayThenPostValue = (stateValue, inputName, valueToSend) => {
  //   this.setState({ value: stateValue }, () => {
  //     this.props.editCriteria(inputName, valueToSend);
  //   });
  // };

  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <Dropdown
          value={this.state.value}
          name={this.props.name}
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

export default connect(
  null,
  { editCriteria }
)(DropdownInput);
