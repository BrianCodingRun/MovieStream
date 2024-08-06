import React, { useEffect, useState, useRef, useContext } from "react";
import tmdbApi, { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./header.scss";
import { FaRegBookmark } from "react-icons/fa";
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import VideoPlayer from "../video-player/VideoPlayer";
import { GlobalContext } from "../../context/AuthWrapper";

const Header = (props) => {
  // Get Global Context
  const { addToWatchlist, watchlist } = useContext(GlobalContext);

  // Init state
  const [lists, setLists] = useState([]);
  const [item, setItem] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isWatchTrailer, setIsWatchTrailer] = useState(false);
  const intervalRef = useRef(null);

  // Get params
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = { language: 'fr-FR' };

      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(props.type, { params });
          break;
        case category.tv:
          response = await tmdbApi.getTvList(props.type, { params });
          break;
        default:
          response = await tmdbApi.getMoviesList(props.type, { params });
      }
      setLists(response.results.slice(0, 8));
    }
    getList();
  }, [props.type, props.category]);

  const getDetails = async (id) => {
    try {
      let response = null;
      const params = { language: 'fr-FR' };
      switch (props.category) {
        case category.tv:
          response = await tmdbApi.detail("tv", id, { params });
          break;
        default:
          response = await tmdbApi.detail("movie", id, { params });
      }
      setItem(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (lists.length > 0) {
      getDetails(lists[current].id);
    }
  }, [current, lists]);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((current) => (current + 1) % lists.length);
    }, 10000);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startInterval();
    if (isWatchTrailer) {
      stopInterval();
    }
    return () => stopInterval();
  }, [lists, isWatchTrailer]);

  // Function to play/pause setInterval
  const playPause = () => {
    if (isPlaying) {
      stopInterval();
    } else {
      startInterval();
    }
    setIsPlaying(!isPlaying);
  };

  // Define the elements to animate
  const headerRef = useRef(null);

  // Create an animation timeline
  useEffect(() => {
    const tl = gsap.timeline();
    tl.clear();

    if (headerRef.current) {

      tl.fromTo(
        headerRef.current,
        { opacity: 0, autoAlpha: 0 },
        { opacity: 1, autoAlpha: 1, delay: 0.3, duration: 0.5 }
      );
      tl.play();

    }

    document.addEventListener("resize", () => {
      tl.pause();
    });

    return () => {
      tl.clear();
      document.removeEventListener("resize", () => { });
    };
  }, [current]);

  // Utility function to extract year from date
  const getYear = (date) => {
    return date ? date.split("-")[0] : "N/A";
  };

  // Convert duration to hours and minutes
  const convertDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}min`;
  };

  // Function to click on watch trailer
  const clickWatchTrailer = () => {
    setIsWatchTrailer(!isWatchTrailer);
  };

  if (lists.length === 0) {
    return null;
  }

  const currentMovie = lists[current];

  // Watchlist
  let storedWatchlist = watchlist.find(o => o.id === currentMovie.id);

  const watchListDisabled = storedWatchlist ? true : false;

  return (
    <header className="homeHeader" ref={headerRef}>
      <div className="background">
        <img
          src={apiConfig.originalImage(currentMovie.backdrop_path)}
          alt={currentMovie.title}
        />
      </div>
      <div className="homeHeaderContainer">
        <div className="homeHeaderContainerLeft">
          {/* Add to watchlist */}
          <div className="addWatchList">
            <button className="addWatchListButton"
              disabled={watchListDisabled}
              onClick={() => addToWatchlist(currentMovie, props.category)}
            >
              <FaRegBookmark />
              <span>
                {watchListDisabled ? "Dans votre watchlist" : "Ajouter à la liste"}
              </span>
            </button>
          </div>
        </div>
        <div className="homeHeaderContainerMiddle">
          <div className="homeHeaderContainerMiddleTitle">
            <h1>
              {currentMovie.title
                ? currentMovie.title.length > 15
                  ? currentMovie.title.substring(0, 15) + "..."
                  : currentMovie.title
                : null}
            </h1>
          </div>
          <div className="homeHeaderContainerMiddleDetails">
            <div className="homeHeaderContainerMiddleDetailsLeft">
              <div className="homeHeaderContainerMiddleDetailsRating">
                <p>Avis</p>
                <span>{currentMovie.vote_average.toFixed(2)}</span>
              </div>
            </div>
            <hr />
            <div className="homeHeaderContainerMiddleDetailsRight">
              {/* Release Date */}
              <span>
                {currentMovie.release_date
                  ? getYear(currentMovie.release_date)
                  : getYear(currentMovie.first_air_date)}
              </span>
              <hr />
              {/* Runtime */}
              <span>
                {item && item.runtime ? convertDuration(item.runtime) : "N/A"}
              </span>
              <hr />
              {/* Genres */}
              <span>
                {item &&
                  item.genres.slice(0, 1).map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
              </span>
            </div>
          </div>
          {/* Watch Trailer */}
          <div className="callToAction">
            <div className="viewDetails">
              <Link to={`/movie/${currentMovie.id}/details`}>
                <span>Details</span>
              </Link>
            </div>
            <div className="watchTrailer">
              <button className="watchTrailerButton" onClick={clickWatchTrailer}>
                <IoIosPlay />
                <span>
                  Watch Trailer
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="homeHeaderContainerRight">
          {/* Play/Pause Button */}
          <div className="playPause">
            <button
              className="playPauseButton"
              aria-label="playPauseButton"
              onClick={playPause}
            >
              {isPlaying ? <IoIosPause /> : <IoIosPlay />}
            </button>
          </div>
        </div>
      </div>
      {isWatchTrailer && <VideoPlayer id={currentMovie.id} onClose={clickWatchTrailer} />}
    </header>
  );
};

export default Header;