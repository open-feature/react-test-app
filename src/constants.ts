export const SUSPENSE_DEMO_NAME = 'suspense';
export const SUSPENSE_DEMO_DESCRIPTION = 'Suspend until the provider is ready.'
export const SUSPENSE_DEMO_EXPLANATION = 'Components depending on feature flags suspend until the provider is ready to evaluate them. You can modify the "delay" query param to artificially delay the startup.'

export const FLAG_CHANGE_DEMO_NAME = 'flag-change';
export const FLAG_CHANGE_DEMO_DESCRIPTION = 'Automatic updates when flag values change'
export const FLAG_CHANGE_DEMO_EXPLANATION = 'When the provider emits an event indicating flags have changed, components associated with that provider automatically re-render. You can modify the "delay" query param to change the interval.'

export const CONTEXT_CHANGE_DEMO_NAME = 'context-change';
export const CONTEXT_CHANGE_DEMO_DESCRIPTION = 'Components update when the context is changed'
export const CONTEXT_CHANGE_DEMO_EXPLANATION = 'Components after the provider reconciles its state with a context change (usually associated with a user action). If reconciliation is not instantaneous, the component suspends. You can modify the "delay" query param to change reconciliation delay.'
