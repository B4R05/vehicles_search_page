import React from "react";
import { Grid, Image, Segment, Button } from "semantic-ui-react";
import { shallow, mount } from "enzyme";
import App from "../App";
import Root from "../../Root.js";

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <App />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

describe("App.js", () => {
  it("shows one Grid component", () => {
    expect(wrapped.find(Grid).length).toEqual(1);
  });
  it("shows SearchForm, SearchResults and SearchSummary", () => {
    expect(wrapped.find("SearchForm").length).toEqual(1);
    expect(wrapped.find("SearchResults").length).toEqual(1);
    expect(wrapped.find("SearchSummary").length).toEqual(1);
  });
  //
  it("clicking on the Button changes its content", () => {
    wrapped.find("Button").simulate("click");
    expect(wrapped.find("Button").prop("content")).toEqual(
      "Go To Consumer Mode"
    );
  });
});
