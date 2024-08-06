import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { category as cate } from '../api/tmdbApi';
import HeaderPage from '../components/headers/HeaderPage';
import MovieGrid from '../components/movie-grid/MovieGrid';
import Footer from '../components/footer/Footer';

const Catalog = () => {

  const { category } = useParams()

  document.title = `MovieStream | ${category === cate.movie ? 'Films' : 'Séries TV'}`

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <>
      <HeaderPage>
        {category === cate.movie ? 'Films' : 'Séries TV'}
      </HeaderPage>
      <div className="container">
        <MovieGrid category={category} />
      </div>
      <Footer />
    </>
  )
}

export default Catalog