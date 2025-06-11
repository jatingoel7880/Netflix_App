# Netflix GPT - AI-Powered Movie Recommendation Platform

![Project Banner](https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Browse.jpg)

## Table of Contents
- [Features](#-features)
- [Technical Implementation](#-technical-implementation)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [License](#-license)
- [Contact](#-contact)

## 🌟 Features

### Authentication System
- Secure Sign In/Sign Up forms with validation
- Firebase authentication integration
- Protected routing (redirects to Browse after login)
- Redux-powered user state management

### Movie Browsing Experience
- Dynamic header with navigation
- Featured movie section with:
  - Background trailer playback
  - Movie title and description
  - Interactive play button
- Curated movie suggestions
- Category-based movie lists:
  - Now Playing
  - Popular
  - Top Rated
  - Trending
  - Upcoming
  - TV Shows

### AI-Powered Features
- Gemini API integration for intelligent search
- Natural language processing for queries
- Personalized movie recommendations
- Real-time search results

### 🏗️ Core Architecture
```mermaid
graph TD
    A[React Frontend] --> B[Firebase Auth]
    A --> C[Redux State Management]
    A --> D[TMDb API]
    A --> E[Gemini AI]
    B --> F[Protected Routes]
    C --> G[User Session]

## 🛠️ Technical Implementation

### Tech Stack
**Frontend:**
- React.js (Create React App)
- Redux for state management
- Tailwind CSS for styling
- React Router for navigation

**Backend Services:**
- Firebase Authentication
- TMDB API for movie data
- Google Gemini API for AI recommendations

### Key Components
1. **Authentication Flow**
```javascript
// Redux user slice
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser: (state, action) => action.payload,
    removeUser: () => null,
  },
});

2. **Movie Data Fetching**

// API call example
const fetchNowPlayingMovies = async () => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}`
  );
  const json = await data.json();
  dispatch(addNowPlayingMovies(json.results));
};


AI Integration

javascript
// Gemini API implementation
const getAIMovieRecommendations = async (query) => {
  const response = await fetchGeminiAPI({
    prompt: `Recommend movies similar to: ${query}`,
  });
  return processAIData(response);
};

📸 Screenshots
Authentication
<div align="center"> <img src="https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Login.png" width="600" alt="Login Page"> <p>Login/Signup Page</p> </div>
Browse Page
<div align="center"> <img src="https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Browse.jpg" width="600" alt="Browse Page"> <p>Main Browse Interface</p> </div>
Movie Details
<div align="center"> <img src="https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Movie.jpg" width="600" alt="Movie Page"> <p>Movie Details Page</p> </div>
AI Search
<div align="center"> <img src="https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Gpt1.png" width="600" alt="GPT Search"> <p>AI-Powered Recommendations</p> </div>
🚀 Getting Started
Prerequisites
Node.js (v16 or higher)

npm or yarn

Firebase project

TMDB API key

Gemini API key

Installation
Clone the repository:

bash
git clone https://github.com/jatingoel7880/Netflix_App.git
cd Netflix_App
Install dependencies:

bash
npm install
Create .env file:

env
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_TMDB_KEY=your_tmdb_key
REACT_APP_GEMINI_KEY=your_gemini_key
Start development server:


npm start
📂 Project Structure
text
src/
├── assets/               # Static assets
├── components/           # Reusable components
│   ├── auth/            # Auth components
│   ├── browse/          # Browse components
│   ├── common/          # Shared components
│   └── header/          # Navigation header
├── hooks/               # Custom hooks
├── pages/               # Page components
│   ├── Login.jsx        # Login page
│   ├── Browse.jsx       # Main page
│   └── MoviePage.jsx    # Movie details
├── store/               # Redux store
│   ├── userSlice.js     # Auth state
│   └── movieSlice.js    # Movie state
├── utils/               # Utility functions
├── App.js               # Root component
└── index.js             # Entry point
