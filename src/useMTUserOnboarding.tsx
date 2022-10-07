import { useEffect } from "react";
import useScript from "react-script-hook";
import { MTEnv, MTUserOnboardingPropTypes } from "./types";
const MT_USER_ONBOARDING_STABLE_URL = "https://cdn.moderntreasury.com/compliance/v1/mt-onboarding.js";

export const useMTUserOnboarding = (options: MTUserOnboardingPropTypes = {}) => {
  if (typeof options.env === "undefined") {
    options.env = MTEnv.PROD;
  }
  const [loading, error] = useScript({
    src: MT_USER_ONBOARDING_STABLE_URL,
    checkForExisting: true,
  });

  useEffect(() => {
    if (loading) {
      return;
    }
    if (error || !window.MTOnboarding) {
      console.error("Error loading MT-UserOnboarding", error);
      return;
    }
  }, [loading, error, options]);

  const ready = !loading && !error;
  function open(userOnboardingId: string) {
    window.MTOnboarding.open({
      userOnboardingId: userOnboardingId,
      env: options.env,
      onSuccess: options.onSuccess,
      onCancel: options.onCancel,
      onError: options.onError,
    });
  }
  return [ready, error, open] as const;
};
