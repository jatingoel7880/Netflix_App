# 🎬 Netflix GPT - AI-Powered Movie Recommendation Platform

![Browse Page Banner](https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Browse.jpg)

An AI-enhanced movie streaming interface built using **React**, **Redux**, **Firebase**, **TMDB**, and **Gemini AI**. Enjoy an immersive movie discovery and recommendation experience powered by natural language search and real-time suggestions.

---

## 📑 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📦 Project Structure](#-project-structure)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🧠 Technical Highlights](#-technical-highlights)
- [📸 Screenshots](#-screenshots)
- [📜 License](#-license)
- [📧 Contact](#-contact)

---

## 🚀 Features

### 🔐 Authentication System
- Firebase Email/Password-based sign-in and sign-up
- Form validation for secure authentication
- Protected routes with redirect after login
- Redux-managed user state

<div align="center">
  <img src="https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Login.png" width="600" alt="Login Page"/>
  <p><strong>Login / Signup Page</strong></p>
</div>

---

### 🎥 Movie Browsing Dashboard
- Dynamic header and hero section with background trailer
- Interactive play and info buttons
- Curated movie lists via TMDB:
  - Now Playing, Popular, Top Rated, Trending, Upcoming, TV Shows

<div align="center">
  <img src="https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Browse.jpg" width="600" alt="Browse Page"/>
  <p><strong>Main Browse Page</strong></p>
</div>

---

### 🤖 AI-Powered Recommendations
- Integrated Gemini API for intelligent search
- NLP-driven suggestions like “movies like Inception”
- Fast real-time movie results

<div align="center">
  <img src="https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Gpt1.png" width="600" alt="GPT Search"/>
  <p><strong>AI Movie Search</strong></p>
</div>

---

### 📽️ Movie Details Page
- Detailed info (description, release, genres)
- Hover trailers & instant previews

<div align="center">
  <img src="https://github.com/jatingoel7880/Netflix_App/blob/master/public/images/Movie.jpg" width="600" alt="Movie Page"/>
  <p><strong>Movie Details View</strong></p>
</div>

---

## 🛠️ Tech Stack

### 🚧 Frontend

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img src="https://img.shields.io/badge/React_Router-D0021B?style=for-the-badge&logo=react-router&logoColor=white"/>
</p>

### ☁️ Backend / APIs

<p>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"/>
  <img src="https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google&logoColor=white"/>
  <img src="https://img.shields.io/badge/TMDB_API-01D277?style=for-the-badge&logo=themoviedatabase&logoColor=white"/>
</p>

---

## 📦 Project Structure

src/
├── assets/        # Static files and images
├── components/    # Reusable UI components
│   ├── auth/         # Auth forms (Login, Signup)
│   ├── browse/       # Movie dashboard components
│   ├── common/       # Loader, buttons, banners
│   └── header/       # Navbar and search
├── hooks/         # Custom React hooks
├── pages/         # Main route views
├── store/         # Redux slices and configuration
├── utils/         # Constants and helpers
├── App.js         # Routing and layout
└── index.js       # Root render


---

## ⚙️ Installation & Setup

### 📋 Prerequisites

- Node.js (v16+)
- Firebase Project (for auth)
- TMDB API Key
- Gemini API Key

### 🧰 Steps
 
1. Clone the Repository
```bash
git clone https://github.com/jatingoel7880/Netflix_App.git
cd Netflix_App

2. Install Dependencies
npm install

3. Create .env file
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_TMDB_KEY=your_tmdb_key
REACT_APP_GEMINI_KEY=your_gemini_key

4. Run Locally
npm start

---

## 🧠 Technical Highlights

🔄 Authentication Flow
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser: (state, action) => action.payload,
    removeUser: () => null,
  },
});

🎬 Movie Fetching Example
const fetchNowPlayingMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}`
  );
  const data = await response.json();
  dispatch(addNowPlayingMovies(data.results));
};

🤖 Gemini API Integration
const getAIMovieRecommendations = async (query) => {
  const response = await fetchGeminiAPI({
    prompt: `Recommend movies like: ${query}`,
  });
  return processAIData(response);
};

	
📧 Contact
Name: Jatin Goel
Email: jating.0311@gmail.com
GitHub: @jatingoel7880

