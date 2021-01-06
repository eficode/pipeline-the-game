/// <reference types="Cypress" />

// @ts-ignore
Cypress.Commands.add('fill', {prevSubject: 'element'}, (subject, value) => {
    return cy.wait(1).then(() => {
      const element = subject[0]

      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set

      const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
      )?.set

      if (element.tagName.toLowerCase() === 'input') {
        nativeInputValueSetter?.call(element, value)
      } else {
        nativeTextAreaValueSetter?.call(element, value)
      }

      const inputEvent = new Event('input', {bubbles: true})

      element.dispatchEvent(inputEvent)

      Cypress.log({
        name: 'fill',
        message: value,
        $el: subject,
        consoleProps: () => {
          return {
            value
          }
        }
      })
      return cy.wait(1);
    })

  }
)

Cypress.Commands.add('clearIndexedDB', async () => {
  const databases = await (window.indexedDB as any).databases();

  await Promise.all(
    databases.map(({name}: any) =>
      new Promise((resolve, reject) => {
        const request = window.indexedDB.deleteDatabase(name);

        request.addEventListener('success', resolve);
        // Note: we need to also listen to the "blocked" event
        // (and resolve the promise) due to https://stackoverflow.com/a/35141818
        request.addEventListener('blocked', resolve);
        request.addEventListener('error', reject);
      }),
    ),
  );
});


Cypress.Commands.add('getInputByName', (name: string, options: Parameters<typeof cy.get>[1]) => {
  cy.get(`input[name="${name}"],select[name="${name}"]`, options);
});

