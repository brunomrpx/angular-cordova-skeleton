let _isCordova = null

function isCordovaAppFn() {
  if (_isCordova === null) {
    _isCordova =  !(/^http/.test(window.location.protocol));
  }

  return _isCordova;
};

export const isCordovaApp = isCordovaAppFn();

export function bindCordovaEvents() {
  window.addEventListener('native.keyboardshow', function (e) {
    // scroll to focused input
    setTimeout(function () {
      (document.activeElement as any).scrollIntoViewIfNeeded();
    }, 100);
  });
}

