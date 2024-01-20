const request = require('request');
const cheerio = require('cheerio');

// List of news article URLs
const articleURLs = [
  "https://www.cnn.com/2023/10/20/business/deutsche-bank-settlement-epstein-accusers/index.html", 
  "https://www.axios.com/2023/10/20/jerome-powell-bond-rout"
  // Add more URLs as needed
];

// Function to scrape and summarize news articles
function scrapeAndSummarizeArticles(articleURLs) {
  const summarizedArticles = [];

  function processArticle(index) {
    if (index < articleURLs.length) {
      const url = articleURLs[index];

      request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const articleText = extractArticleText(body);

          // Summarize the article using the 'summarizeArticle' function
          const summary = summarizeArticle(articleText);

          // Add the summarized article to the list
          summarizedArticles.push(summary);

          // Process the next article
          processArticle(index + 1);
        } else {
          console.error(`Error fetching article: ${url}`);
          processArticle(index + 1); // Continue with the next article
        }
      });
    } else {
      // All articles have been processed
      listSummarizedArticles(summarizedArticles);
    }
  }

  // Start processing the first article
  processArticle(0);
}

// Function to extract article text using cheerio
function extractArticleText(html) {
  const $ = cheerio.load(html);

  // Modify this selector to target the element containing the article text
  const articleTextElement = $('body'); // Change to the appropriate selector

  return articleTextElement.text();
}

// Dummy function to simulate summarizing an article
function summarizeArticle(text) {
  // This is where you call your 'summarizeArticle' function
  // Replace this with your actual function
  return 'Summary: ' + text;
}

// Function to list summarized articles
function listSummarizedArticles(articles) {
  articles.forEach((summary, index) => {
    console.log(`Article ${index + 1}: ${summary}\n`);
  });
}

// Start scraping and summarizing the articles
scrapeAndSummarizeArticles(articleURLs);
