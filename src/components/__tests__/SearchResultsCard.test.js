import React from "react";
import { Card } from "semantic-ui-react";
import { shallow, mount } from "enzyme";
import SearchResultsCard from "../SearchResultsCard";
import Root from "../../Root.js";

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <SearchResultsCard info={{}} />
    </Root>
  );
});
afterEach(() => {
  wrapped.unmount();
});

describe("SearchResultsCard.js", () => {
  it("initially returns 1 Card, 1 image", () => {
    expect(wrapped.find(Card).length).toEqual(1);
    expect(wrapped.find("img").length).toEqual(1);
  });
});
