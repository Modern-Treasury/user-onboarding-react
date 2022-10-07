import React from "react";
import { useMTUserOnboarding } from "./useMTUserOnboarding";
import { MTUserOnboardingProps, MTUserOnboardingPropTypes } from "./types";

export const MTUserOnboarding: React.FC<MTUserOnboardingProps & MTUserOnboardingPropTypes> = (props) => {
  const { userOnboardingId, children, style, className, ...config } = props;
  const [ready, error, open] = useMTUserOnboarding(config);

  return (
    <button
      disabled={Boolean(error || !ready)}
      type="button"
      className={className}
      style={{ ...style }}
      onClick={() => open(userOnboardingId)}
    >
      {children}
    </button>
  );
};

MTUserOnboarding.displayName = "MTUserOnboarding";
