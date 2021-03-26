# Getting Started

To set up the entire project and install dependencies please have a look at the [Readme](../../README.md).

## Architectural choices

The web app is a SPA built with React and typescript.

State management is handled using redux with redux-toolkit. Async work management
is implemented using redux-saga.

The ui is based on the combination styled-component and styled-system.
The development of the component is isolated using Storybook.
The built Storybook are also published to Chromatic.

Forms are handled using react-hook-form.

E2e tests are implemented using Cypress.


## src folder structure
The folder structure is based on a per-feature folder and per file folder.
The `_shared` folder on the contrary contains common code that is used 
across the entire application

```
    src                         
    ├── _shared        
    ├── assets        
    └── gameView
       ├── apis                 <- functions that interact with the backend
       ├── components           <- React components to compse UI
       ├── hooks                <- hooks containing state connection and logic
       ├── sagas                <- sagas to manage async flows
       ├── types                <- interfaces and models
       ├── utils                <- utils related to the specific feature module
       └── slice.ts             <- state slice definition with actions, reducers and selectors
```


## typedoc
The core elements are documented using typedoc. You can generate the html documentation
by running 
```shell
npm run generate:doc
```
The doc is separated using a namespace convention implemented using 
`typedoc-plugin-external-module-name` and a custom name resolution
logic that you can find in [typedoc-plugin-external-module-name](./.typedoc-plugin-external-module-name.js)


## i18n

The application ui is ready to be translated in different languages.
The i18n is implemented inside the `@pipeline/i18n` package, exposing the 
`useTranslate` hook that returns a function used to translate a key
```jsx
const t = useTranslate();

return (
    <Button
        label={t('dashboard.howToPlay')}
    />
);

```

## e2e tests organization

All the tests are under the `cypress` folder

### firebase admin communication
Using a custom cypress plugin the e2e test can interact with firebase in admin mode,
to set up for example a new clean user, or retrieve an object or even execute a query.

This is used to make assertion on what the app writes on the database, and make sure
that they are in line with the user interaction made, or the form fields filled.

All the admin tasks list are available in [firebaseTasks](./cypress/plugins/firebaseTasks.ts)

This interaction is wrapped using custom commands.

### e2e and i18n
Most of the time in e2e with end up with verifying that an error message appears on 
the scree and similar assertion. Or even queying the dom by text content. 
This is a bad approach if you have i18 configured in the application because changing
a text in the language file can break an e2e.

So we made cypress aware of app i18n implementing custom assertion and queries, 
that can now be done using translation keys instead of the actual text.

Then you can write
```typescript
cy.get('body').should('contain.translationOf', 'general.responsiveness.title');
```
to assert on text content or 
```typescript
cy.containsTranslationOf('button', 'createGame.createButtonText').click();
```
to query dom element based on text content.

## Centralized loading

To manage request status you should use the centralized loading exposed by 
`@pipeline/@pipeline/requests-status`.
* create an action to trigger the saga that execute the async request
* wrap the saga using `addRequestStatusManagement` and the request key. For example
```typescript
export default function* createGameSaga() {
  yield takeEvery(
    actions.createGame,
    addRequestStatusManagement(executeCreateGame, 'createGame')
  );
}
```
* create a hook to manage async flow using the `createRequestHook` factory 
specifying request key, and the error message scope in the option (if necessary)
```typescript
export const useSendResetPasswordEmail = createRequestHook(
  'auth.sendResetPasswordEmail',
  actions.sendResetPasswordEmail,
  {
    errorMessagesScope: 'auth.errors',
  },
);
```
* use the hook in your component to trigger the async flow, listen to loading and error,
receiving the translated error directly
```typescript
  const {
    call: sendResetPasswordEmail,
    translatedError: sendTranslateError,
    loading: sendLoading,
    success: sendSuccess,
  } = useSendResetPasswordEmail();
```

### error scope
The error scope is prepended to the error code before translating to allow
custom error messages for the same error code in different domains. The default
scope is `errors.code`. If the error code is not available into the general
code, or the custom one than the message in the error object is used, or a general
error message.

Look at the package for more details.
