# Globe AI

We created a web app that aggregates and displays news info from any chosen country in a subject field of your choosing. The user navigates an interactive globe, wherein the user can click any region of the Earth and see their chosen latitude and longitude, along with what country it corresponds to. 

# How it Works

We used ReactJS to design our front end and implemented our backend logic using NodeJS. We used an open-source API to render the globe and integrated it into our front end as a component, along with logic for returning the clicked location as latitude and longitude. Then, a geocoding API was called using coordinate data, which returned the name of the country that the user had clicked on. To aggregate the news, we used the News API to capture the top articles in the selected countries with the chosen category and used OpenAI's GPT API to process and prune articles based on relevance, and returned them in JSON format. In addition, articles are translated from the native language to English to allow for greater diversity in news sources.

# Screenshots

