import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Segment, Form, Radio, Header } from "semantic-ui-react";
import { editCriteria } from "../actions";
import DropdownInput from "./DropdownInput";

class SearchFormRadio extends Component {
  state = {
    value: "commit"
  };

  //sets the state and edits criteria object with values that backend can take accordingly
  handleChange = (e, { value }) => {
    this.setState({ value }, () => {
      if (this.state.value === "commit") {
        let obj = { rolling: false, number_of_weeks: 52 };
        this.props.editCriteria(obj);
      } else {
        let obj = { rolling: true, number_of_weeks: 1 };
        this.props.editCriteria(obj);
      }
    });
  };

  renderInputsOrTextBlock = () => {
    if (this.state.value === "rolling") {
      return (
        <div className="search-form__radio-text">
          <Header as="h5">Your subscription will be renewed weekly</Header>
          <small>
            You are not benefiting from long term subscription discounts! Select{" "}
            <strong>Commit and save</strong> above to see how much you could be
            saving!
          </small>
        </div>
      );
    } else {
      return (
        <Fragment>
          <DropdownInput
            label="Duration"
            name="number_of_weeks"
            stateOptions={[
              { key: "52", value: 52, text: "52 Weeks" },
              { key: "2", value: 2, text: "2 Weeks" },
              { key: "4", value: 4, text: "4 Weeks" },
              { key: "6", value: 6, text: "6 Weeks" },
              { key: "8", value: 8, text: "8 Weeks" }
            ]}
          />

          <DropdownInput
            label="Subsciption starts within the"
            name="subscription_start_days"
            stateOptions={[
              { key: "21", value: 21, text: "Next 21 Days" },
              { key: "7", value: 7, text: "Next 7 Days" },
              { key: "2", value: 2, text: "Next 2 Days" }
            ]}
          />
        </Fragment>
      );
    }
  };

  render() {
    return (
      <Fragment>
        <Segment>
          <Header as="h3">Subscription type</Header>
          <Form>
            <Form.Field>
              <Radio
                label="Weekly rolling subscription"
                name="radioGroup"
                value="rolling"
                checked={this.state.value === "rolling"}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Commit and save subscription"
                name="radioGroup"
                value="commit"
                checked={this.state.value === "commit"}
                onChange={this.handleChange}
              />
            </Form.Field>
          </Form>

          {this.renderInputsOrTextBlock()}
        </Segment>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { editCriteria }
)(SearchFormRadio);
