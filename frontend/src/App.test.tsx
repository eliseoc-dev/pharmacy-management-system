import {
  render,
  screen,
} from "@testing-library/react";

import {
  expect,
  test,
} from "vitest";

import App from "./App";


test(
  "renders pharmacy dashboard title",
  () => {
    render(<App />);

    expect(
      screen.getByText(
        "Pharmacy Dashboard"
      )
    ).toBeInTheDocument();
  }
);