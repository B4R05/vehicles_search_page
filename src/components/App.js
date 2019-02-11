import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import SearchSummary from "./SearchSummary";
import "../styles/App.css";

class App extends Component {
  render() {
    return (
      <Grid columns={2} stackable style={{ padding: "2%" }}>
        <Grid.Column computer={4} mobile={8} tablet={6}>
          <SearchForm />
        </Grid.Column>
        <Grid.Column computer={12} mobile={8} tablet={10}>
          <SearchSummary />
          <SearchResults />
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
