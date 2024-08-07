# Globe AI

We created a web app that aggregates and displays news info from any chosen country in a subject field of your choosing. The user navigates an interactive globe, wherein the user can click any region of the Earth and see their chosen latitude and longitude, along with what country it corresponds to. 

# How it Works

We used ReactJS to design our front end and implemented our backend logic using NodeJS. We used an open-source API to render the globe and integrated it into our front end as a component, along with logic for returning the clicked location as latitude and longitude. Then, a geocoding API was called using coordinate data, which returned the name of the country that the user had clicked on. To aggregate the news, we used the News API to capture the top articles in the selected countries with the chosen category and used OpenAI's GPT API to process and prune articles based on relevance, and returned them in JSON format. In addition, articles are translated from the native language to English to allow for greater diversity in news sources.

# Screenshots
<img width="1712" alt="image" src="https://github.com/arsh-guntakal/HackTx2023/assets/68369981/b45722fc-722c-4c92-9d48-e5c9c965b3a5">

<img width="1708" alt="image" src="https://github.com/arsh-guntakal/HackTx2023/assets/68369981/715426dc-ba1e-42ff-b491-b5587cfa0e81">


## Inspiration
We were inspired by the lack of information about world events and peoples' inability to find news that would make them more informed.

## What it does
The web app allows you to use an interactable globe, along with relevant categories to find the most important news articles from whatever country you click on.

## How we built it
We used React to design the frontend, including the tailwind CSS framework, to generate an ideal user experience. We used the Open AI API to communicate with GPT to generate the briefing and used the News API to get the relevant news in each country and the GlobeGL API to generate an interactive globe.

## What's next for Globe AI
We want to support more countries in our project and implement a web scraper that gets the text from the article and prompt GPT better for summarizations. We also want to develop a way for GPT to detect the sentiment of the article and have a "Good News" score as part of our briefing.
