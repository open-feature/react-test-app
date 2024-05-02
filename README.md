# Running the Demo App

* `npm install`
* `npm run start` ->  http://localhost:3000

# Demos

The `@openfeature/react-sdk` is built on the `@openfeature/web-sdk`, and adds additional react-specific APIs and features.
The evaluation API is exposed through the "useFlag" hooks. The hooks automatically re-render when flags change, and feature optional suspense-support while flags are not ready to be evaluated.
The demo application itself will walk you though the demos listed below.

## Suspense

Components depending on feature flags suspend until the provider is ready to evaluate them.
You can modify the "delay" query param to artificially delay the startup.

See the [code](./src/demos/SuspenseDemo.tsx).

## Flag Change

When the provider emits an event indicating flags have changed, components associated with that provider automatically re-render.
You can modify the "delay" query param to change the interval.

See the [code](./src/demos/FlagChangeDemo.tsx).

## Context Change

Components after the provider reconciles its state with a context change (usually associated with a user action).
If reconciliation is not instantaneous, the component suspends. You can modify the "delay" query param to change reconciliation delay.

See the [code](./src/demos/ContextChangeDemo.tsx).