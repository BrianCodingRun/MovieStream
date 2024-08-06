import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './navbar.scss'
import logoWebsite from '../../assets/icons/movie-app-black.png'
import apiConfig from '../../api/apiConfig'
import tmdbApi from '../../api/tmdbApi';
import { category } from '../../api/tmdbApi';
import { FaRegBookmark, FaMicrophoneSlash } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa6";
import { CookiesContext } from '../../context/CookiesContext'

const headerNav = [
  {
    display: 'Films',
    path: '/movie',
    isDesktop: true
  },
  {
    display: 'Series',
    path: '/tv',
    isDesktop: true
  },
  {
    display: 'WatchList',
    path: '/watchlist',
    isDesktop: false
  }
];

const Navbar = () => {

  const { pathname } = useLocation();
  const { cookies } = useContext(CookiesContext);
  const [state, setState] = useState({
    genres: [],
    resultSearch: [],
    genresById: {},
    search: '',
    isSearchOpenMobile: false,
    isMenuOpen: false,
    isSearchOpen: false,
    isLoadData: false,
    listening: false,
  });

  const navigate = useNavigate();

  const active = headerNav.findIndex(e => e.path === pathname);
  const recognitionRef = useRef(null);

  // Vérifier si l'utilisateur est sur un appareil mobile
  const isMobile = () => {
    let isMobileDevice = false;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      isMobileDevice = true;
    }

    return isMobileDevice;
  }

  const handleNavigation = (path) => {
    navigate(path);
    setState({ ...state, isMenuOpen: false });
  }

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'fr-FR';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setState((prevState) => ({
          ...prevState,
          search: transcript,
        }));
      };

      recognitionRef.current.onend = () => {
        setState((prevState) => ({
          ...prevState,
          listening: false,
        }));
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setState((prevState) => ({
          ...prevState,
          listening: false,
        }));
      };
    }
  }, []);

  // Toggle Menu Mobile
  const toggleMenu = () => {
    setState({ ...state, isMenuOpen: !state.isMenuOpen });
  }

  // Search Movies
  useEffect(() => {
    const fetchSearch = async () => {
      let response = null;

      try {
        setState({ ...state, isLoadData: true });

        const params = {
          query: state.search,
          language: 'fr-FR'
        }
        switch (pathname) {
          case '/movie':
            response = await tmdbApi.search(category.movie, { params });
            break;
          case '/tv':
            response = await tmdbApi.search(category.tv, { params });
            break;
          default:
            response = await tmdbApi.search(category.multi, { params });
        }
        setState({ ...state, resultSearch: response.results, search: state.search, isLoadData: false });

        // Fetch genres for each result
        response.results.forEach(item => fetchGenres(item));

      } catch (error) {
        console.log('Error: ', error);

      }
    }
    if (state.search) {
      fetchSearch();
    } else {
      setState({ ...state, resultSearch: [] });
    }
  }, [state.search, pathname])

  // Get genres
  const fetchGenres = async (item) => {
    const params = { language: 'fr-FR' };
    try {
      const response = await tmdbApi.getGenres(item.media_type, { params });
      setState(prevState => ({
        ...prevState,
        genresById: {
          ...prevState.genresById,
          [item.id]: response.genres
        }
      }));
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  // Toggle Search
  const toggleSearch = () => {
    resetSearch();
    setState({ ...state, isSearchOpen: !state.isSearchOpen, isMenuOpen: false });
  }

  // Toggle Search Mobile
  const toggleSearchMobile = () => {
    setState({ ...state, isSearchOpenMobile: !state.isSearchOpenMobile });
    resetSearch();
  }

  // Reset Search 
  const inputRef = useRef(null);
  const resetSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setState({ ...state, search: '', isSearchOpenMobile: !state.isSearchOpenMobile, isSearchOpen: !state.isSearchOpen, resultSearch: [] });
    }
  }

  // Handle Search
  const handleSearch = (e) => {
    setState({ ...state, search: e.target.value });
  }

  // Utility function to extract year from date
  const getYear = (date) => {
    return date ? date.split('-')[0] : 'N/A';
  }

  // Start/Stop Voice Recognition
  const handleVoiceSearch = () => {
    if (recognitionRef.current) {
      if (state.listening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
        setState({ ...state, listening: true });
      }
    } else {
      console.log("Speech Recognition API not supported in this browser.");
    }
  }

  // View Details
  const viewDetails = () => {
    resetSearch();
    setState({ ...state, isMenuOpen: false, isSearchOpen: false, isSearchOpenMobile: false });
  }

  // Fermer le menu mobile à chaque montage du composant
  useEffect(() => {
    if (state.isMenuOpen) {
      toggleMenu();
    }
  }, []);

  return (
    <nav>
      <div className="logo">
        <Link to="/" onClick={() => handleNavigation('/')}><img src={logoWebsite} alt="logo" /></Link>
      </div>
      <div className="middle">
        {/* Search Bar */}
        <div className="searchBar">
          <input
            type="text"
            name="search"
            id="search"
            placeholder={state.listening ? "Parler maintenant" : "Rechercher un film ou une série"}
            ref={inputRef}
            onChange={handleSearch}
            value={state.search}
            className={state.isSearchOpen ? 'active' : ''}
          />
          <div className="action">
            {/* Microphone */}
            {
              state.isSearchOpen && (
                <>
                  {
                    state.listening ? (
                      <button className={`microphone ${state.listening ? 'active' : ''}`} onClick={handleVoiceSearch}>
                        <FaMicrophoneSlash />
                      </button>
                    ) : (
                      cookies.accepted && (
                        <button className={`microphone ${state.listening ? 'active' : ''}`} onClick={handleVoiceSearch}>
                          <FaMicrophone />
                        </button>
                      )
                    )
                  }
                  <hr />
                </>
              )
            }
            {/* Search */}
            <button className='search' onClick={toggleSearch} aria-label='Click to search'>
              {state.isSearchOpen ? <IoMdClose /> : <CiSearch />}
            </button>
          </div>
        </div>
        {/* Search Result */}
        {
          !isMobile() ? (
            <div className={`searchResult ${state.search !== '' ? 'active' : ''}`}>
              {/* Header Search */}
              <div className="headerSearch">
                <h4>Résultats pour: <span>{state.search}</span></h4>
              </div>
              {/* Search Result */}
              <div className="searchResultScroll">
                {
                  // N'afficher que les résultats ayant un poster
                  state.resultSearch.length > 0 ? state.resultSearch.filter(item => item.poster_path).slice(0, 4).map((item, index) => (
                    <div key={index} className="searchResultItem">
                      {/* Link to detail */}
                      <Link to={`/${category[item.media_type]}/${item.id}/details`} onClick={viewDetails}><span>Detail</span></Link>
                      <div className="searchResultCardLeft">
                        <img src={apiConfig.w500Image(item.poster_path)} alt="background" />
                      </div>
                      <div className="searchResultCardRight">
                        {/* Title */}
                        <h3>{item && item.title ? item.title : item.name}</h3>
                        {/* Genres */}
                        <div className="genres">
                          {
                            state.genresById[item.id] ? state.genresById[item.id].slice(0, 3).map((genre, index) => (
                              <span key={index}>{genre.name}</span>
                            )) : 'Chargement...'
                          }
                        </div>
                        {/* Release Date */}
                        <div className="releaseDate">
                          <span>
                            {item.release_date ? getYear(item.release_date) : getYear(item.first_air_date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="searchResultItem noResult">
                      <h4>Aucun résultat</h4>
                    </div>
                  )
                }
              </div>
              {/* All Results */}
              <div className="footerSearch">
                <Link to={`/search/${state.search}`} onClick={toggleSearch}>
                  <h4>Voir plus de résultats pour: <span>"{state.search}"</span></h4>
                </Link>
              </div>
            </div>
          ) : ''
        }
      </div>
      <div className="rightContent">
        <hr />
        <ul className={`nav-links ${state.isMenuOpen ? 'active' : ''}`} >
          <li className="searchBox">
            <button className='searchBtn' onClick={toggleSearchMobile}>
              <CiSearch />
              <span>Search</span>
            </button>
          </li>
          {
            isMobile() ? (
              headerNav.map((item, index) => (
                <li key={index} className={index === active ? 'active' : ''}>
                  <Link to={item.path} onClick={() => handleNavigation(item.path)}>{item.display}</Link>
                </li>
              ))
            ) : (
              headerNav.filter(item => item.isDesktop).map((item, index) => (
                <li key={index} className={index === active ? 'active' : ''}>
                  <Link to={item.path} onClick={() => handleNavigation(item.path)}>{item.display}</Link>
                </li>
              ))
            )
          }
        </ul>
        <hr />
        {/* Watchlist */}
        <div className="watchlist">
          <Link to="/watchlist" onClick={() => handleNavigation('/watchlist')}>
            <FaRegBookmark />
            <span>Watchlist</span>
          </Link>
        </div>
      </div>
      <button className={`navToggler ${state.isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label='Ouvrir le menu'>
        <span className='line l1'></span>
        <span className='line l2'></span>
      </button>

      {
        isMobile() ? (
          <div className={`searchBoxWrapper ${state.isSearchOpenMobile ? '' : 'close'}`}>
            {/* Header */}
            <div className="headerSearch">
              <input type="text" name="search" id="search" placeholder={state.listening ? "Parler maintenant" : "Rechercher un film ou une série"} ref={inputRef} onChange={handleSearch} />
              <button className='search' onClick={toggleSearchMobile} aria-label='Click to search'><IoMdClose /></button>
              {/* Microphone */}
              {
                cookies.accepted && (
                  state.listening ? (
                    <button className={`microphone ${state.listening ? 'active' : ''}`} onClick={handleVoiceSearch}>
                      <FaMicrophoneSlash />
                    </button>
                  ) : (
                    <button className={`microphone ${state.listening ? 'active' : ''}`} onClick={handleVoiceSearch}>
                      <FaMicrophone />
                    </button>
                  )
                )
              }
            </div>
            <hr />
            {/* Search Result Wrapper */}
            <div className="searchWrapperResult">
              {
                state.resultSearch.length > 0 ? state.resultSearch.filter(item => item.poster_path).slice(0, 6).map((item, index) => (
                  <div key={index} className="searchWrapperResultItem">
                    <Link to={`/${category[item.media_type]}/${item.id}/details`} onClick={viewDetails}>
                      <div className="searchWrapperResultItemLeft">
                        <img src={apiConfig.w500Image(item.poster_path)} alt="background" />
                      </div>
                      <div className="searchWrapperResultItemRight">
                        {/* Title */}
                        <h3>{item && item.title ? item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title : item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name}</h3>
                        {/* Genres */}
                        <div className="genres">
                          {
                            state.genresById[item.id] ? state.genresById[item.id].slice(0, 3).map((genre, index) => (
                              <span key={index}>{genre.name.length > 15 ? genre.name.substring(0, 10) + '...' : genre.name}</span>
                            )) : 'Chargement...'
                          }
                        </div>
                        {/* Release Date */}
                        <div className="releaseDate">
                          <span>
                            {item.release_date ? getYear(item.release_date) : getYear(item.first_air_date)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                )) : (
                  <div className="searchWrapperResultItem noResult">
                    <h4>
                      {
                        state.search.length < 1 ? 'Veuillez entrer un mot-clé de recherche' : state.search.length > 1 ? 'Aucun résultat trouvé' : 'Aucun résultat'
                      }
                    </h4>
                  </div>
                )
              }
            </div>
            <hr />
            {
              state.search !== '' ? (
                <div className='footerSearch'>
                  <Link to={`/search/${state.search}`} onClick={toggleSearch}>
                    <h4>Voir plus de résultats pour: <span>"{state.search}"</span></h4>
                  </Link>
                </div>
              ) : (
                ''
              )
            }
          </div>
        ) : (
          ''
        )
      }
    </nav>
  )
}

export default Navbar;