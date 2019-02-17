import React from "react";
import { Pagination } from "semantic-ui-react";
import { shallow, mount } from "enzyme";
import SearchPagination from "../SearchPagination";
import Root from "../../Root.js";

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <SearchPagination />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

describe("SearchPagination.js", () => {
  it("initially returns 1 span ", () => {
    expect(wrapped.find("span").length).toEqual(1);
  });
});
