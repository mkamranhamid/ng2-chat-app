import { Ng2ChattingAppPage } from './app.po';

describe('ng2-chatting-app App', function() {
  let page: Ng2ChattingAppPage;

  beforeEach(() => {
    page = new Ng2ChattingAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
