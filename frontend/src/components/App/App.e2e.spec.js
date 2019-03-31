import puppeteer from 'puppeteer';

const timeout = 30000;

describe('App integration', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');

    // Login to keycloak
    await page.waitForSelector('#kc-header-wrapper');
    await page.type('input[name="username"]', process.env.USERNAME);
    await page.type('input[name="password"]', process.env.PASSWORD);
    await page.click('input[name="login"]');
    await page.waitForSelector('#root', { timeout });
  }, timeout);

  it('should display the app component', async () => {
    await expect(page).toMatchElement('.app');
  }, timeout);

  afterAll(async () => {
    await browser.close();
  });
});
