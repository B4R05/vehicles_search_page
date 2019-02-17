import React from "react";
import { Dropdown } from "semantic-ui-react";
import { shallow, mount } from "enzyme";
import SearchForm from "../SearchForm";
import DropdownInput from "../DropdownInput";
import SearchFormRadio from "../SearchFormRadio";
import Slider from "../Slider";
import Root from "../../Root.js";

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <SearchForm />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

describe("SearchForm.js", () => {
  it("initially returns DropdownInputs and 2 sliders", () => {
    expect(wrapped.find(DropdownInput).length).toEqual(4);
    expect(wrapped.find(Slider).length).toEqual(2);
  });

  it("renders extra DropdownInputs when h5 clicked", () => {
    wrapped.find("h5").simulate("click");
    wrapped.update();
    expect(wrapped.find(DropdownInput).length).toEqual(11);
  });
});
