import React from 'react'
import { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'

import './App.css'
import Search from './Components/Search'
import Spinner from './Components/Spinner';
import MovieCard from './Components/MovieCard'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_Options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};
const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Using useDebounce to delay the search term update
  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 500, [searchTerm]);

  const recordSearch = async (movie) => {
    if (!movie) return;
    try {
      await fetch(`${BACKEND_URL}/api/trending`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          movieId: movie.id,
          title: movie.title,
          poster_path: movie.poster_path || null
        })
      });
    } catch (err) {
      // Non-critical — don't block the UI if backend is down
      console.warn('Could not record search:', err.message);
    }
  };

  const fetchTrending = async () => {
    setIsTrendingLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/trending`);
      const data = await res.json();
      setTrendingMovies(data);
    } catch (err) {
      console.warn('Could not fetch trending:', err.message);
    } finally {
      setIsTrendingLoading(false);
    }
  };

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_Options);
      const data = await response.json();
      console.log('Fetched movies:', data.results);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await recordSearch(data.results[0]);
        await fetchTrending(); // refresh trending after recording
      }

    }
    catch (error) {
      setErrorMessage('Error fetching movies. Please try again later.');
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);


  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero banner" />
          <h1>MovieVault — Find <span className="text-gradient">Movies</span>  You'll Love </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {/* TRENDING SECTION */}
        {!isTrendingLoading && trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Searches</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.movieId}>
                  <p>{index + 1}</p>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : '/no-movie.png'
                    }
                    alt={movie.title}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}


        <section className="all-movies">
          <h2>{searchTerm ? `Results for "${searchTerm}"` : 'All Movies'}</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>

      </div>
    </main>
  )
}

export default App