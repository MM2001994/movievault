# MineSearch 🎬 — Find Movies You'll Love

A sleek, responsive movie discovery web application built with **React.js** and **Tailwind CSS**. The application features real-time search capabilities with optimized debouncing and a custom trending movies tracker backend powered by **Node.js** and **Express**, utilizing the **TMDB (The Movie Database) API**.

🔗 **Live Frontend:** [https://movievault-mm2001994s-projects.vercel.app](https://movievault-mm2001994s-projects.vercel.app)

---

## 🚀 Features

* **Real-Time Search with Debouncing:** Instant movie lookup that minimizes API overhead by waiting for the user to finish typing.
* **Trending Searches Tracker:** Displays the top 5 most trending movies dynamically, backed by a custom lightweight JSON storage mechanism via the Express API.
* **Aesthetic UI/UX:** Built with a dark-themed cinematic aesthetic using Tailwind CSS, featuring smooth scaling hover effects, clean typography, and high-quality movie cards.
* **Fully Responsive:** Optimized performance and seamless layouts across desktop, tablet, and mobile screens.

---

## 📸 Previews

### 🏠 Landing Page
![MineSearch Landing Page](public\Screenshot 2026-06-27 132601.png)

### 🔍 Live Search Results & Trending Metrics
![MineSearch Search Results](public\Screenshot 2026-06-27 132641.png)

---

## 🛠️ Tech Stack

**Frontend:**
* React.js (Functional components, Hooks)
* Tailwind CSS (Custom gradients & layouts)
* Vite (Build tool)

**Backend:**
* Node.js & Express.js
* JSON File System (for trending data storage)
* TMDB API Integration

**Deployment:**
* **Frontend:** Vercel
* **Backend:** Render

---

## ⚙️ Environment Variables

To run this project locally, you will need to set up `.env` files in both your frontend and backend directories.

### Backend `.env`
Create a `.env` file in the root of your `backend` folder:
```env
PORT=5000
TMDB_API_KEY=your_tmdb_api_key_here
```

### Frontend `.env`
Create a `.env` file in the root of your `frontend` folder:
```env
VITE_API_BASE_URL=http://localhost:5000 # Points to your local backend during development
```

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/minesearch.git](https://github.com/your-username/minesearch.git)
   cd minesearch
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   # Ensure your .env file is created with the TMDB API key
   npm start
   ```
   *The backend will run on `http://localhost:5000` and the trending API will be available at `/api/trending`.*

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   # Ensure your .env file is created pointing to the backend
   npm run dev 
   ```