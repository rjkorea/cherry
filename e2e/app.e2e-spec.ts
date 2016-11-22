import { CherryPage } from './app.po';

describe('cherry App', function() {
  let page: CherryPage;

  beforeEach(() => {
    page = new CherryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
