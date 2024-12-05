import puppeteer from 'puppeteer';

/**
 * Scrapes the textual content of a webpage.
 * @param {string} url - The URL of the webpage to scrape.
 * @returns {Promise<string>} - The scraped text content.
 */
const scrapeTextContent = async (url) => {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Extract visible text from the page
    const textContent = await page.evaluate(() => {
      return document.body.innerText || '';
    });

    return textContent;
  } catch (error) {
    throw new Error(`Failed to scrape content: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export default scrapeTextContent;