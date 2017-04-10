import { Angular4CordovaPage } from './app.po';

describe('angular4-cordova App', () => {
  let page: Angular4CordovaPage;

  beforeEach(() => {
    page = new Angular4CordovaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
