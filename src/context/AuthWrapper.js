import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { RenderNavigation } from './RenderNavigation';
import AppReducer from './AppReducer';
import { CookiesProvider } from './CookiesContext';
import CookieWidget from '../components/widgets/CookieWidget';
import CookieBanner from '../components/banners/CookieBanner';
import Navbar from '../components/navbar/Navbar';

// Initial State
const initialState = {
  watchlist: localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')) : [],
  watched: localStorage.getItem('watched') ? JSON.parse(localStorage.getItem('watched')) : [],
};

// Watchlist Context
export const GlobalContext = createContext(initialState);

// Provider Components
export const GlobalProvider = props => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    localStorage.setItem('watched', JSON.stringify(state.watched));
  }, [state]);

  // Actions
  const addToWatchlist = (item, category) => {

    // Ajouter l'objet "category" dans le tableau "item"
    (item.category) ? item.category.push(category) : item.category = category;

    // Ajouter l'objet "item" dans le tableau "watchlist"
    dispatch({
      type: 'ADD_TO_WATCHLIST',
      payload: item
    });

  }

  const removeFromWatchlist = (item) => {
    dispatch({
      type: 'REMOVE_FROM_WATCHLIST',
      payload: item
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        genres: state.genres,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}

// Auth Context
const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  return (
    <AuthContext.Provider value={{}}>
      <CookiesProvider>
        <Navbar />
        <CookieWidget />
        <CookieBanner />
        <RenderNavigation />
      </CookiesProvider>
    </AuthContext.Provider>
  )
}