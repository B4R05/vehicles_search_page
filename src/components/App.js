import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Button } from "semantic-ui-react";
import { editCriteria, resetCriteria } from "../actions";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import SearchSummary from "./SearchSummary";
import "../styles/App.css";

import { defaultCriteria, defaultCriteriaPCO } from "../config/minimumCriteria";

export class App extends Component {
  state = {
    hireType: "Go To PCO Mode"
  };

  handleClick = () => {
    //fetch new kind of data (PCO or Consumer related) with new vehicle_type value
    //clear all activefilters from the previous hireType mode ('PCO' mode/hireType)
    if (this.state.hireType === "Go To Consumer Mode") {
      this.setState({ hireType: "Go To PCO Mode" }, () => {
        this.props.resetCriteria(defaultCriteria);
      });
    }

    if (this.state.hireType === "Go To PCO Mode") {
      this.setState({ hireType: "Go To Consumer Mode" }, () => {
        //if user selected sub_type or city_jurisdiction (which are only unique to PCO version)
        //we want to clear any PCO related fields and send backend only Consumer valid fields
        this.props.resetCriteria(defaultCriteriaPCO);
      });
    }
  };

  render() {
    return (
      <Grid columns={2} stackable>
        <Grid.Row columns={1}>
          <Grid.Column computer={15} mobile={8}>
            <Button
              primary
              onClick={this.handleClick}
              content={this.state.hireType}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Column computer={4} mobile={8} tablet={6}>
          <SearchForm />
        </Grid.Column>
        <Grid.Column computer={11} mobile={8} tablet={10}>
          <SearchSummary />
          <SearchResults />
        </Grid.Column>
      </Grid>
    );
  }
}

App.propTypes = {
  resetCriteria: PropTypes.func.isRequired
};

export default connect(
  null,
  { editCriteria, resetCriteria }
)(App);
