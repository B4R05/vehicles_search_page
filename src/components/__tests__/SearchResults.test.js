import React from "react";
import { Card } from "semantic-ui-react";
import { shallow, mount } from "enzyme";
import SearchResults from "../SearchResults";
import SearchPagination from "../SearchPagination";
import SearchResultsCard from "../SearchResultsCard";
import Root from "../../Root.js";

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <SearchResults cars={[{}, {}, {}]} />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

describe("SearchResults.js", () => {
  it("initially returns 1 section, 1 SearchPagination", () => {
    expect(wrapped.find("section").length).toEqual(1);
    expect(wrapped.find(SearchPagination).length).toEqual(1);
  });
});
