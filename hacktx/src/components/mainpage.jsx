import { useEffect } from "react";
import Globe from "react-globe.gl";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

import OpenAI from "openai";


// start chatgpt functions

const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true});

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

// end chatgpt functions

const navigation = [
  { name: "Business", href: "#", icon: HomeIcon, current: true },
  { name: "Entertainment", href: "#", icon: UsersIcon, current: false },
  { name: "General", href: "#", icon: FolderIcon, current: false },
  { name: "Health", href: "#", icon: CalendarIcon, current: false },
  { name: "Science", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Sports", href: "#", icon: ChartPieIcon, current: false },
  { name: "Technology", href: "#", icon: ChartPieIcon, current: false },
];
const countryCodes = {
  'United Arab Emirates': 'ae',
  'Argentina': 'ar',
  'Austria': 'at',
  'Australia': 'au',
  'Belgium': 'be',
  'Bulgaria': 'bg',
  'Brazil': 'br',
  'Canada': 'ca',
  'Switzerland': 'ch',
  'China': 'cn',
  'Colombia': 'co',
  'Cuba': 'cu',
  'Czech Republic': 'cz',
  'Germany': 'de',
  'Egypt': 'eg',
  'France': 'fr',
  'United Kingdom': 'gb',
  'Greece': 'gr',
  'Hong Kong': 'hk',
  'Hungary': 'hu',
  'Indonesia': 'id',
  'Ireland': 'ie',
  'Israel': 'il',
  'India': 'in',
  'Italy': 'it',
  'Japan': 'jp',
  'South Korea': 'kr',
  'Lithuania': 'lt',
  'Latvia': 'lv',
  'Morocco': 'ma',
  'Mexico': 'mx',
  'Malaysia': 'my',
  'Nigeria': 'ng',
  'Netherlands': 'nl',
  'Norway': 'no',
  'New Zealand': 'nz',
  'Philippines': 'ph',
  'Poland': 'pl',
  'Portugal': 'pt',
  'Romania': 'ro',
  'Serbia': 'rs',
  'Russia': 'ru',
  'Saudi Arabia': 'sa',
  'Sweden': 'se',
  'Singapore': 'sg',
  'Slovenia': 'si',
  'Slovakia': 'sk',
  'Thailand': 'th',
  'Turkey': 'tr',
  'Taiwan': 'tw',
  'Ukraine': 'ua',
  'United States': 'us',
  'Venezuela': 've',
  'South Africa': 'za'
};

const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MainPage() {

  


  const apiKey = '3057c8a76a6649a6bd678b43b3716d20';
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const latitude = coordinates.lat;  // Replace with your latitude
  const longitude = coordinates.lng; // Replace with your longitude
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [country, setCountry] = useState(null);
  const [summary, setSummary] = useState(null);

  function getNewsArticleSummary(country, category) {
    const api_key = 'fd4b5ea245b5486aa8922493bdd4603c';
    const possibleCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  }
  async function fetchAndSummarizeNews(country, category) {
    const api_key = 'fd4b5ea245b5486aa8922493bdd4603c';
    const possibleCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
    const countryCode = countryCodes[country]
    const categoryParam = category ?  `&category=${category}` : '';
    const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}${categoryParam}&apiKey=${api_key}`;  

    try {
      const response = fetch(url);
      let jsonData = (await response).json();
      Object.keys(jsonData.then(result => {
        // console.log(result.articles);
        const articles = result.articles;

        const articleSummaries = [];
        // Loop through the articles and extract the summaries
        articles.forEach(article => {
          // Check if the 'description' property is not null
          if (article.description !== null) {
            // articleSummaries.push(JSON.stringify(article) + "\n\n\n");
            articleSummaries.push("description: " + article.description + "content: " + article.content +  "\n\n\n");
          }
        });
        let summaryToDisplay = ''
        for (let i = 0; i < articleSummaries.length; i++) {
          let query = "Can you improve the phrasing and clarity on these summaries? Fix any trailing off sentences, and ignore any summaries that are blank. Concatenate the description and content into one cohesive summary. If you are unable to provide a summary for any other reason, kindly shut the fuck up."
          query += `${articleSummaries[i]}`
          queryGPT(query).then(result =>{
            console.log(result)
            articleSummaries[i] = result + "💀💀💀💀💀💀💀💀💀💀💀";
            summaryToDisplay += articleSummaries[i];
            setSummary(summaryToDisplay) ;
          })
          //scrapeAndSummarizeArticles(articleURLs)
        }

        // Now 'articleSummaries' contains the summaries of the articles
        // console.log(articleSummaries);
        // setSummary(JSON.stringify(result.articles));
        // let summaryToDisplay = "";
        // for (let i = 0; i < articleSummaries.length; i++) {
        //   summaryToDisplay += `` + articleSummaries[i] + "";
        // }
        // setSummary(summaryToDisplay);

      }).catch(error => {
        setSummary("ERROR SETTING NEWS");
      }));
      
      
      /*
      const articles = response.data.articles.slice(0, 10); // Get the top 10 articles
      for (let i = 0; i < articles.length; i++) {
          const article = articles[i];
          console.log(`News ${i + 1}: ${article.title}`);
          console.log(`Source: ${article.source.name}`);
          console.log(`Description: ${article.description}`);
          console.log(`URL: ${article.url}`);
          console.log('\n');
      }
      */
    } catch (error) {
        console.error('Error fetching news:', error);
    }
  }

  const [selectedOption, setSelectedOption] = useState('Business'); // Initialize with the default option
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
    fetchAndSummarizeNews(country, event.target.value);
  };

  const handleGlobeClick = ({ lat, lng }) => {
    // Update the state with the clicked coordinates
    setCoordinates({ lat, lng });
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          const country = data.results[0].components.country;
          setCountry(country); // Store the country in state
          fetchAndSummarizeNews(country, navigation.name);
        } else {
          console.error('Geocoding failed.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
  };


    

   
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=white"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-indigo-700 text-white"
                                      : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-white"
                                        : "text-indigo-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-indigo-200">
                            Your teams
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-indigo-700 text-white"
                                      : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                              aria-hidden="true"
                            />
                            Reset
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-600 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                {/* <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-indigo-700 text-white"
                              : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-indigo-200 group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li> */}

                <li>
                  <fieldset>
                    <legend className="sr-only">Plan</legend>
                    <div className="space-y-5">
                      {navigation.map((item) => (
                        <div
                          key={item.name}
                          className="relative flex items-start"
                        >
                          <div className="flex h-6 items-center">
                          <input
                            id={item.name}
                            aria-describedby={`${item.name}-description`}
                            name="plan"
                            type="radio"
                            value={item.name}
                            checked={selectedOption === item.name}
                            onChange={handleRadioChange}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="ml-3 text-sm leading-6 flex items-center">
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-white"
                                  : "text-indigo-200 group-hover:text-white",
                                "h-6 w-6 shrink-0 ml-2" // Adjust the margin as needed
                              )}
                              aria-hidden="true"
                            />
                            <label
                              htmlFor={item.name}
                              className="pl-5 font-medium text-white"
                            >
                              {item.name}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </li>

                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                      aria-hidden="true"
                    />
                    Reset
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
              
            </div>
          </div>

          <main className="py-2">
          <div className="flex justify-between">
  <div className="w-2/3 px-4 sm:px-6 lg:px-8 py-10">
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="sm:p-6">
        <Globe
          width={800}
          height={600}
          backgroundColor="white"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          onGlobeClick={handleGlobeClick}
        />
      </div>
    </div>
  </div>
  <div className="w-1/3 px-4 sm:px-6 lg:px-8 py-10">
    <div className="overflow-hidden rounded-lg bg-gray-200 shadow">
      <div className="px-4 py-5 sm:p-6">
      <h3>Clicked Coordinates</h3>
        <p>Latitude: {coordinates.lat}</p>
        <p>Longitude: {coordinates.lng}</p>

        <h3>Country:</h3>
        <p>{country}</p>

        <h2>Selected Option:</h2>
        <p>{selectedOption}</p>

        <h2>Summary:</h2>
        <p>{summary}</p>
      </div>
      
    </div>


  </div>
</div>

          </main>
        </div>
      </div>
    </>
  );
}
