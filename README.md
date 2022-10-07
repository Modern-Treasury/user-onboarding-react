# Getting Started with `user-onboarding-react`
React component for integrating with [Modern Treasury's Compliance User Onboarding](https://www.moderntreasury.com/products/compliance)

## Install

To install the `user-onboarding-react` npm package, you must use one of the following commands.

### NPM Installation
```
npm install @modern-treasury/user-onboarding-react
```

### Yarn Installation
```shell
yarn add @modern-treasury/user-onboarding-react
```

## Documentation

To start onboarding users to your application, you must generate a User Onboarding Object and use its ID to start the session.

### Creating User Onboarding Objects

[Create a User Onboarding](https://docs.moderntreasury.com/docs/2-create-user-onboarding) and replace <GENERATED_USER_ONBOARDING_ID> with your User Onboarding's ID.

For a demo of this SDK being used, look [here](https://app.moderntreasury.com/compliance/user_onboarding_demo).

## Examples

### Functional Option

```tsx
import { useMTUserOnboarding } from "@modern-treasury/user-onboarding-react";

// Pass in optional options as shown below
const options = {
 ...
}

const [ready, error, open] = useMTUserOnboarding(options);

return (
  <button
    onClick={() => open("<GENERATED_USER_ONBOARDING_ID>")}
    disabled={!ready}
  >
    Open MT-Onboarding
  </button>
);
```

### Default Button Option

```tsx
import { MTUserOnboarding } from "@modern-treasury/user-onboarding-react";

const options = {
  userOnboardingId: "<GENERATED_USER_ONBOARDING_ID>",
  onSuccess: () => {
    console.log("MT User Onboarding is a Success!");
  },
  onCancel: () => {
    console.log("MT User Onboarding has been Canceled!");
  },
  onError: () => {
    console.log("MT User Onboarding has an Error!");
  },
  style: {
    backgroundColor: "green",
    boarder: "none",
    color: "white",
    width: "200px",
    height: "75px",
    children: "Open User Onboarding",
    className: "MT-Onboarding",
    padding: "15px 32px",
    textAlign: "center" as const,
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
  },
};

function App() {
  return (
    <div className="App">
      <MTUserOnboarding {...options}>
        Open MTUserOnboarding
      </MTUserOnboarding>
    </div>
  );
}
```
