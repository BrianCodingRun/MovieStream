import React, { useEffect } from "react";
import Header from "../components/headers/Header";
import MovieList from "../components/movie-list/MovieList";
import { category, movieType, tvType } from "../api/tmdbApi";
import { Link } from "react-router-dom";
import "../styles/accueil.scss"
import { FaChevronRight } from "react-icons/fa6";
import Footer from "../components/footer/Footer";

const Accueil = () => {
  document.title = "MovieStream";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


  return (
    <>
      <Header category={category.movie} type={movieType.now_playing} />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Sortie cette année</h2>
            <Link to="/movie">
              <span>Voir plus</span>
              <FaChevronRight />
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Les mieux notés</h2>
            <Link to="/movie">
              <span>Voir plus</span>
              <FaChevronRight />
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Series Télévisés</h2>
            <Link to="/tv">
              <span>Voir plus</span>
              <FaChevronRight />
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Les mieux notés</h2>
            <Link to="/tv">
              <span>Voir plus</span>
              <FaChevronRight />
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Accueil;