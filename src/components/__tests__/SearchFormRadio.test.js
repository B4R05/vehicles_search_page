import React from "react";
import { Dropdown, Segment, Header, Form, Radio } from "semantic-ui-react";
import { shallow, mount } from "enzyme";
import DropdownInput from "../DropdownInput";
import SearchFormRadio from "../SearchFormRadio";
import Root from "../../Root.js";

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <SearchFormRadio />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

describe("SearchFormRadio.js", () => {
  it("initially returns 1 Segment, 1 Form, 1 Header and 1 radio", () => {
    expect(wrapped.find(Segment).length).toEqual(1);
    expect(wrapped.find(Form).length).toEqual(1);
    expect(wrapped.find(Header).length).toEqual(1);
    expect(wrapped.find(Radio).length).toEqual(2);
  });
});
