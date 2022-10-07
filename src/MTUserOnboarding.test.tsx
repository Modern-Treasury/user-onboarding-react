import React from "react";
import { render, screen } from "@testing-library/react";
import { MTUserOnboarding } from "./MTUserOnboarding";

test("renders learn react button", () => {
  render(<MTUserOnboarding userOnboardingId={"test-id"} />);
  expect(screen.getByRole("button")).toBeTruthy();
});
