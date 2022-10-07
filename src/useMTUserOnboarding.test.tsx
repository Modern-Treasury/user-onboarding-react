import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react";
import { useMTUserOnboarding } from "./useMTUserOnboarding";
import { MTEnv, ScriptLoadingState, MTUserOnboardingOptionProps, ReadyState } from "./types";
import useScript from "react-script-hook";

jest.mock("react-script-hook");
const mockedUseScript = useScript as jest.Mock;

const mockedOpenMTUserOnboarding = () => {
  console.log("clicked");
};

const HookComponent: React.FC<{ config: MTUserOnboardingOptionProps }> = ({ config }) => {
  const [ready, error] = useMTUserOnboarding(config);

  return (
    <div>
      <button
        onClick={() => {
          mockedOpenMTUserOnboarding();
        }}
      >
        Open
      </button>
      <div>{ready ? ReadyState.READY : ReadyState.NOT_READY}</div>
      <div>{error ? ReadyState.ERROR : ReadyState.NO_ERROR}</div>
    </div>
  );
};

describe("useMTUserOnboarding", () => {
  const config: MTUserOnboardingOptionProps = {
    env: MTEnv.PROD,
    onSuccess: () => {
      console.log("Success!");
    },
    onCancel: () => {
      console.log("Canceled!");
    },
    onError: (error: Record<string, unknown>) => {
      console.log("Error!");
      console.log(error);
    },
  };

  beforeEach(() => {
    mockedUseScript.mockImplementation(() => ScriptLoadingState.LOADED);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  it("should not be ready when script is loading", () => {
    mockedUseScript.mockImplementation(() => ScriptLoadingState.LOADING);
    const renderedComponent = render(<HookComponent config={config} />);
    expect(renderedComponent.getByText(ReadyState.NOT_READY)).toBeTruthy();
    expect(renderedComponent.getByText(ReadyState.NO_ERROR)).toBeTruthy();
    expect(renderedComponent).toMatchSnapshot();
  });

  it("should not be ready if script fails to load", () => {
    const logSpy = jest.spyOn(console, "error");
    mockedUseScript.mockImplementation(() => ScriptLoadingState.ERROR);
    const renderedComponent = render(<HookComponent config={config} />);
    expect(renderedComponent.getByText(ReadyState.NOT_READY)).toBeTruthy();
    expect(renderedComponent.getByText(ReadyState.ERROR)).toBeTruthy();
    expect(renderedComponent).toMatchSnapshot();
    expect(logSpy).toHaveBeenCalledWith("Error loading MT-UserOnboarding", "SCRIPT_LOAD_ERROR");
  });

  it("should render and get clicked", () => {
    const renderedComponent = render(<HookComponent config={config} />);
    expect(renderedComponent.getByRole("button"));
    expect(renderedComponent.getByText(ReadyState.READY));
    expect(renderedComponent.getByText(ReadyState.NO_ERROR));
    expect(renderedComponent).toMatchSnapshot();
    const logSpy = jest.spyOn(console, "log");
    fireEvent.click(renderedComponent.getByRole("button"));
    expect(logSpy).toHaveBeenCalledWith("clicked");
    expect(renderedComponent).toMatchSnapshot();
  });
});
