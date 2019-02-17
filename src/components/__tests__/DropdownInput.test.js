import React from "react";
import { Dropdown } from "semantic-ui-react";
import { shallow, mount } from "enzyme";
import DropdownInput from "../DropdownInput";
import Root from "../../Root.js";

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <DropdownInput
        label="Distance"
        name="max_distance"
        stateOptions={[
          { key: "1000", value: 1000, text: "Nationwide" },
          { key: "25", value: 25, text: "25 miles" },
          { key: "50", value: 50, text: "50 miles" },
          { key: "75", value: 75, text: "75 miles" }
        ]}
      />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

describe("DropdownInput.js", () => {
  it("returns 1 div, 1 label and Dropdown", () => {
    expect(wrapped.find("div").length).toEqual(8);
    expect(wrapped.find("label").length).toEqual(1);
    expect(wrapped.find("Dropdown").length).toEqual(1);
  });
});
