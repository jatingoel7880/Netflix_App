import React, { useEffect, useRef, useState } from "react";
import lang from "../../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, SUPPORTED_LANGUAGES } from "../../utils/constants";
import { addGptMovieResult } from "../../utils/gptSlice";
import LoaderNetflix from "../loader/LoaderNetflix";
import { changeLanguage } from "../../utils/configSlice";

const GptSearchBar = () => {
  const [loading, setLoading] = useState(false);
  const language = useSelector((store) => store.config.lang);
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const dispatch = useDispatch();
  const searchText = useRef(null);

  useEffect(() => {
    // Retrieve the selected language preference from localStorage
    const storedLanguage = localStorage.getItem("selectedLanguage");

    // Set the language option based on the stored preference or default to English
    dispatch(changeLanguage(storedLanguage || "en"));
  }, [dispatch]);

  const translate = (key) => lang[language][key];

  const detectLanguage = (text) => {
    // Implement language detection logic here
    // For example, you can use libraries like langdetect or franc
    // For demonstration purposes, let's assume a simple implementation
    if (/[a-zA-Z]/.test(text)) {
      return "en";
    } else if (/[अ-ऋए-ऑउ-एऑ-औअं-अः]/.test(text)) {
      return "hindi";
    } else {
      return "spanish";
    }
  };

  //search movie in tmdb database
  const searchMovieTMDB = async (movie) => {
    setLoading(true);
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    setLoading(false);
    // console.log(json.results);
    return json.results;
  };

  
  const handleGptSearchClick = async () => {
    setLoading(true);
    const userInput = searchText.current.value.trim();
  
    if (!userInput) {
      setLoading(false);
      alert(translate("invalidInputAlert"));
      return;
    }
  
    // Detect language based on user input
    const language = detectLanguage(userInput);
  
    // Ensure that the language is supported
    if (!SUPPORTED_LANGUAGES.map(lang => lang.identifier).includes(language)) {
      setLoading(false);
      alert("Unsupported language. Please enter text in English, Hindi, or Spanish.");
      return;
    }
  
    const genAI = new GoogleGenerativeAI("");
    const model = genAI.getGenerativeModel({ model: "gemini-pro", language });
  
    const yearRegex = /\b\d{4}\b/;
    const userInputWithoutYear = userInput.replace(yearRegex, '').trim();
  
    const gptQuery = language === "en"
      ? `Act as a Movie Recommendation System and suggest some movies for the query: "${userInputWithoutYear}".
         Only give me names of 5 movies, comma separated like the examples result given ahead. If the query is invalid 
         or does not make sense, respond with "Invalid input, please enter a valid movie name". Example Result: Gadar, Sholay, Don, 
         Koi Mil Gaya, Hum saath saath hai`
      : language === "hindi"
        ? `एक मूवी सिफारिश प्रणाली के रूप में कार्य करें और जुबानी: "${userInputWithoutYear}" के लिए कुछ फिल्में सुझाएं।
           केवल मुझे नाम दें 5 फिल्मों, जो की कोमा के रूप में निर्देश दिए गए परिणाम की तरह हैं। यदि अनुरोध अमान्य है 
           या तार नहीं बना रहा है, "अमान्य इनपुट, कृपया एक वैध फिल्म नाम दर्ज करें" के साथ प्रतिसाद दें। उदाहरण परिणाम: गदर, शोले, डॉन, 
           कोई मिल गया, हम साथ साथ हैं`
        : `Act as a Movie Recommendation System and suggest some movies for the query: "${userInputWithoutYear}".
           Only give me names of 5 movies, comma separated like the examples result given ahead. If the query is invalid 
           or does not make sense, respond with "Invalid input, please enter a valid movie name". Example Result: Gadar, Sholay, Don, 
           Koi Mil Gaya, Hum saath saath hai`;
  
    try {
      const result = await model.generateContent(gptQuery);
  
      if (!result || !result.response || !result.response.candidates) {
        setLoading(false);
        alert("No movie names found. Please try again.");
        return;
      }
  
      const response = result.response;
      const gptContent =
        response.candidates?.[0]?.content?.parts?.[0]?.text.trim();
  
      if (!gptContent || gptContent.includes(translate("invalidInputMessage"))) {
        setLoading(false);
        alert(translate("invalidInputAlert"));
        return;
      }
  
      const gptMovies = response.candidates?.[0]?.content?.parts.map((part) =>
        part.text.trim().split(",")
      );
  
      if (!gptMovies || !gptMovies.length) {
        setLoading(false);
        alert("No movie names found. Please try again.");
        return;
      }
  
      const promiseArray = gptMovies.flatMap((movieArray) =>
        movieArray.map((movie) => searchMovieTMDB(movie.trim()))
      );
  
      const tmdbResults = await Promise.all(promiseArray);
  
      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("Error During GPT request:", error);
      alert(translate("errorMessage"));
    } finally {
      setLoading(false);
    }
  };
  
  
  
  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-2 m-3 col-span-9"
          type="text"
          placeholder={lang[language].gptSearchPlaceholder}
        />
        <button
          className="m-3 py-2 px-4 bg-red-700 text-white rounded-lg col-span-3"
          onClick={handleGptSearchClick}
        >
          {lang[language].search}
        </button>
      </form>

      {/* Render Loader component if loading is true */}
      {/* {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <Loader /> 
        </div>
      )} */}

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <LoaderNetflix /> {/* Render Loader component if loading is true */}
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;
