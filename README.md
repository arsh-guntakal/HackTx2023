# Globe AI

We created a web app that aggregates and displays news info from any chosen chosen country in a subject field of your choosing. The site works via interacting with a fully-functional globe, wherein the user can click any region of the Earth and see their chosen latitude and longitude, along with what country it corresponds to. 

# How it Works

We used ReactJS to design our frontend and implemented our backend logic using NodeJS. We used an open-source API to render the globe and integrated it into our front-end as a component, along with logic for returning clicked location as latitude and longitude. Then, a geocoding api was called using coordinate data, which returned the name of the country that the user had clicked on. To aggregate the news, we used a news API to capture the top articles in the selected countries with the chosen category, and used openAI's GPT API to process and prune articles based on relevance, and returned in JSON format. In addition, articles are translated from the native language to English to allow for greater diversity in news sources.

# Screenshots

