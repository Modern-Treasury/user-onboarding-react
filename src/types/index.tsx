import React from "react";

export const ScriptLoadingState = {
  // State: [Loading?, Error?]
  LOADING: [true, null],
  LOADED: [false, null],
  ERROR: [false, "SCRIPT_LOAD_ERROR"],
};

export const ReadyState = {
  READY: "READY", // When script is ready with no errors
  NOT_READY: "NOT_READY", // when script is either still loading or not ready due to an error
  ERROR: "ERROR", // when an error occurs and the script is not ready
  NO_ERROR: "NO_ERROR", // when no error has occurred when being loaded
};

export enum MTEnv {
  PROD = "PROD",
  DEMO = "DEMO",
  DEV = "DEV",
  TEST = "TEST",
}

export interface MTUserOnboardingOptionProps {
  env?: MTEnv;
  onSuccess?: () => void;
  onCancel?: () => void;
  onError?: (error: Record<string, unknown>) => void;
}

export type MTUserOnboardingPropTypes = MTUserOnboardingOptionProps & {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export type MTUserOnboardingProps = MTUserOnboardingOptionProps & {
  userOnboardingId: string;
};

export interface MTUserOnboarding {
  open: (config: MTUserOnboardingProps) => void;
  exit: (force?: boolean) => void;
}

declare global {
  interface Window {
    MTOnboarding: MTUserOnboarding;
  }
}
