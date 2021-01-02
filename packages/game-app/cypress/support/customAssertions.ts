/**
 * Chai assertion for containing translated string
 */
chai.Assertion.addMethod('translationOf', function (key: string) {
  const $element = this._obj;
  const element = $element[0];

  const doc = element.ownerDocument;
  const win = doc.defaultView || doc.parentWindow;

  const translation = win.i18n.t(key);

  const res = $element.text().indexOf(win.i18n.t(key)) !== -1;

  this.assert(
    res
    , "expected #{this} to contain #{exp}"
    , "expected #{this} to not contain #{exp}"
    , translation        // expected
  );
});
