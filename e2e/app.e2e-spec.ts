import { YoutubePage } from './app.po';

describe('youtube App', () => {
  let page: YoutubePage;

  beforeEach(() => {
    page = new YoutubePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
