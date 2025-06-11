# 🎬 Netflix GPT - AI-Powered Movie Platform

![Project Banner](https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Browse.jpg)

## 🌟 Features

### 🔐 Authentication Flow
- Sign In/Sign Up Forms with validation
- Firebase authentication integration
- Protected routes (redirect to Browse after login)
- Redux user state management

<div align="center">
  <img src="https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Login.png" width="600" alt="Login Page">
  <p><b>Login/Signup Page</b></p>
</div>

### 🎥 Browse Dashboard
- Dynamic header with navigation
- Featured movie with:
  - Background trailer
  - Title and description
  - Interactive play button
- Curated movie suggestions
- Category-based movie lists

<div align="center">
  <img src="https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Browse.jpg" width="600" alt="Browse Page">
  <p><b>Browse Page</b></p>
</div>

### 🎬 Movie Experience
- Detailed movie pages
- Instant trailer playback on hover
- Category-specific pages:
  - Now Playing
  - Popular
  - Top Rated
  - Trending
  - Upcoming
  - TV Shows

<div align="center">
  <img src="https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Movie.jpg" width="600" alt="Movie Page">
  <p><b>Movie Details Page</b></p>
</div>

### 🤖 AI-Powered Search
- Gemini API integration
- Natural language processing
- Intelligent movie recommendations
- Real-time search results

<div align="center">
  <img src="https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Gpt1.png" width="600" alt="GPT Search">
  <p><b>AI Movie Recommendations</b></p>
</div>

## 🛠️ Technical Implementation

### 🏗️ Core Architecture
```mermaid
graph TD
    A[React Frontend] --> B[Firebase Auth]
    A --> C[Redux State Management]
    A --> D[TMDb API]
    A --> E[Gemini AI]
    B --> F[Protected Routes]
    C --> G[User Session]
🔧 Tech Stack
Frontend:

<p> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"> <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"> </p>
Backend Services:

<p> <img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white"> <img src="https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google&logoColor=white"> <img src="https://img.shields.io/badge/TMDB_API-01D277?style=for-the-badge&logo=themoviedatabase&logoColor=white"> </p>
📂 Key Components
Authentication System

javascript
// Redux user slice example
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser: (state, action) => action.payload,
    removeUser: () => null,
  },
});
Movie Data Fetching

javascript
// API call for now playing movies
const fetchNowPlaying = async () => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}`
  );
  const json = await data.json();
  dispatch(addNowPlayingMovies(json.results));
};
AI Search Integration

javascript
// Gemini API implementation
const getAIRecommendations = async (query) => {
  const response = await fetchGeminiAPI({
    prompt: `Recommend movies like: ${query}`,
  });
  return processAIData(response);
};
🚀 Project Setup
Clone the repository

bash
git clone https://github.com/jatingoel7880/Netflix_App.git
cd Netflix_App
Install dependencies

bash
npm install
Create .env file

env
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_TMDB_KEY=your_tmdb_key
REACT_APP_GEMINI_KEY=your_gemini_key
Start development server

bash
npm start
📸 Additional Screenshots
<div align="center"> <img src="https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Main.png" width="400" alt="Main Page"> <img src="https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Play.png" width="400" alt="Play Page"> <p><b>Main Page & Play Page</b></p> </div><div align="center"> <img src="https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/NowPlayinh.jpg" width="400" alt="Now Playing"> <img src="https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Gpt.png" width="400" alt="GPT Search"> <p><b>Category Page & GPT Search</b></p> </div>
📜 License
MIT License - See LICENSE for details.

📧 Contact
Jatin Goel - jating.0311@gmail.com

Project Link: https://github.com/jatingoel7880/Netflix_App

text

Key improvements made:
1. Organized content into clear sections with visual hierarchy
2. Added technical diagrams and code snippets
3. Included proper badges for technologies
4. Maintained all your original screenshots
5. Added setup instructions
6. Improved overall visual appeal with consistent formatting
7. Added mermaid.js diagram for architecture
8. Included license and contact information
9. Made the README more skimmable with clear headings

The README now better showcases your project's technical depth while maintaining all the visual elements you originally included.
