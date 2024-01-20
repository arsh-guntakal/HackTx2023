import OpenAI from "openai";
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';



const openai = new OpenAI({ apiKey: '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'});

async function queryGPT(query){
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "You are a helpful assistant."},        
        {"role": "user", "content": query}],
    });
    
     //console.log(response)
    const message = response.choices[0].message.content
    const finishReason = response.choices[0].finish_reason
    return message
}

// List of news article URLs
const articleURLs = [
  "https://www.cnn.com/2023/10/20/business/deutsche-bank-settlement-epstein-accusers/index.html",
  //"https://www.axios.com/2023/10/20/jerome-powell-bond-rout",
  // Add more URLs as needed
];

// Function to scrape and summarize news articles
async function scrapeAndSummarizeArticles(articleURLs) {
  const summarizedArticles = [];

  for (let index = 0; index < articleURLs.length; index++) {
    const url = articleURLs[index];

    try {
      const response = await fetch(url); // Use 'fetch' to make the HTTP request
      if (response.ok) {
        const html = await response.text();
        const articleText = extractArticleText(html);

        console.log(articleText);
        // Summarize the article using the 'summarizeArticle' function
        const summary = summarizeArticle(articleText.length);

        // Add the summarized article to the list
        summarizedArticles.push(summary);
      } else {
        console.error(`Error fetching article: ${url}`);
        return
      }
    } catch (error) {
      console.error(`Error fetching article: ${url}`);
      return
    }
  }

  // List summarized articles
  listSummarizedArticles(summarizedArticles);
}

// Function to extract article text using cheerio
function extractArticleText(html) {
  const $ = cheerio.load(html);

  // Modify this selector to target the element containing the article text
  const articleTextElement = $('div.article-text'); // Change to the appropriate selector

  return articleTextElement.text();
}

// Dummy function to simulate summarizing an article
function summarizeArticle(text) {
  let query = "Can you summarize the key points of this article in 50 to 75 words?"
  query += text
  queryGPT(query).then(result =>{
    console.log(result)
    return result
  });
}

// Function to list summarized articles
function listSummarizedArticles(articles) {
  articles.forEach((summary, index) => {
    console.log(`Article ${index + 1}: ${summary}\n`);
  });
}


function main(){
  let query = "Can you improve the phrasing and clarity on these summaries? Remove any trailing off sentences,"
  query += `
  1) Why was it Orion Kerkering over Seranthony Dominguez in Game 3? Are the Phillies growing concerned over Craig Kimbrel? Rob Thomson addressed both topics Friday.
  2) Jose Altuve was the hero once again for Houston, which is one win away from another World Series trip.
  3) US District Judge Tanya Chutkan on Friday temporarily froze the gag order she issued on Donald Trump in the former president’s federal 2020 election subversion criminal case.
  4) The Israeli government said Hamas militants on Friday freed two Americans. Judith Raanan and her 17-year-old daughter, Natalie, are from suburban Chicago. They had been held hostage in Gaza since militants rampaged through Israel two weeks ago. The pair, who …
  5) Hardline conservative Republican <a href="/world/us/jim-jordan-longtime-critic-top-us-house-republicans-grasps-gavel-2023-10-13/">Jim Jordan</a>'s quest to become speaker of the U.S. House of Representatives ended on Friday as his fellow Republicans revoked t…
  6) [Removed]
  7) United Auto Workers President Shawn Fain on Friday warned of more walkouts at U.S. truck and SUV factories unless the Detroit Three automakers improved wage and benefit offers, insisting companies could afford more than the record packages on the table.
  8) "Where is your outrage?" Rep. Ilhan Omar asked the crowd.
  9) Rite Aid will continue to keep products with phenylephrine on their shelves, at least for now, a spokesperson tells ABC.
  10) Expanding Patrick McHenry’s powers without a formal vote would add layers of uncertainty to any legislation passed.
  11)
  12) Prime Minister Justin Trudeau said on Friday the Indian government's crackdown on Canadian diplomats was making normal life difficult for millions of people in both countries.
  13) Judge questioned Walt Nauta about the risks of keeping his lawyer.
  14) As Israel bombs Gaza, media organisations and researchers are investigating what happened at the al-Ahli Arab Hospital.
  15) Ayo Edebiri, Cate Blanchett, Hasan Minhaj, Jeremy Strong and Joaquin Phoenix, among others, have signed the letter.
  16) Andre Iguodala officially is retiring from the NBA after a 19-year career.
  17) Chinese smartphone company OnePlus this week introduced its first foldable smartphone, the OnePlus Open. OnePlus joins several other manufacturers...
  18) A Zebulon woman who lost her fight with the deadliest form of breast cancer may now help others survive the disease. Her legacy was pushing for more funding to advance metastatic breast cancer research.
  `
  queryGPT(query).then(result =>{
    console.log(result)
  })
  //scrapeAndSummarizeArticles(articleURLs)
}

main();

