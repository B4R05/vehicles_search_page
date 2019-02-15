import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Image, Segment, Button } from "semantic-ui-react";
import { editCriteria, overwriteCriteria } from "../actions";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import SearchSummary from "./SearchSummary";
import "../styles/App.css";

class App extends Component {
  state = {
    hireType: "Go To PCO Mode"
  };

  handleClick = () => {
    //fetch new kind of data (PCO or Consumer related) with new vehicle_type value
    //clear all activefilters from the previous hireType mode ('PCO' mode/hireType)
    if (this.state.hireType === "Go To Consumer Mode") {
      this.setState({ hireType: "Go To PCO Mode" }, () => {
        let obj = {
          page: 1,
          vehicle_type: "Consumer",
          sub_type: "",
          city_jurisdiction: "",
          number_of_weeks: 52,
          subscription_start_days: 30,
          rolling: false
        };
        this.props.overwriteCriteria(obj);
      });
    }

    if (this.state.hireType === "Go To PCO Mode") {
      this.setState({ hireType: "Go To Consumer Mode" }, () => {
        //if user selected sub_type or city_jurisdiction (which are only unique to PCO version)
        //we want to clear any PCO related fields and send backend only Consumer valid fields

        let obj = {
          page: 1,
          vehicle_type: "PCO",
          subscription_start_days: 21,
          number_of_weeks: 52,
          rolling: false
        };
        this.props.overwriteCriteria(obj);
      });
    }
  };

  render() {
    return (
      <Grid columns={2} stackable>
        <Grid.Row columns={1}>
          <Grid.Column computer={15} mobile={8}>
            <Button primary onClick={this.handleClick}>
              {this.state.hireType}
            </Button>
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

export default connect(
  null,
  { editCriteria, overwriteCriteria }
)(App);
