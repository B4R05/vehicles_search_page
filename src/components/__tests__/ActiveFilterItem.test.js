import React from "react";
import { shallow, mount } from "enzyme";
import ActiveFilterItem from "../ActiveFilterItem";
import Root from "../../Root.js";

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <ActiveFilterItem data={{ number_of_seats_min: 2 }} />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

describe("ActiveFilterItem.js", () => {
  it("returns 1 div, 1 span and Icon", () => {
    expect(wrapped.find("div").length).toEqual(1);
    expect(wrapped.find("span").length).toEqual(1);
    expect(wrapped.find("Icon").length).toEqual(1);
  });
});
