import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

const Detail = () => {

  const { category, id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await tmdbApi.detail(category, id, { params: { language: 'fr-FR' } });
        setItem(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchItem();
  }, [category, id]);

  document.title = `MovieStream | ${item?.title || item?.name}`;

  return (
    <>
      {
        item && (
          <>
            <div className="banner" style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}></div>
            <div className="movieContent">
              <div className="movieContentPoster">
                <div className="movieContentPosterImg" style={{
                  backgroundImage: `url(${apiConfig.originalImage(item.poster_path)})`
                }}></div>
              </div>
              <div className="movieContentInfo">
                <div className="title">
                  {item.title || item.name}
                </div>
                <div className="genres">
                  {
                    item.genres && item.genres.slice(0, 5).map((genre, index) => (
                      <span key={index} className='genresItem'>{genre.name}</span>
                    ))
                  }
                </div>
                <p className="overview">{item.overview}</p>
                <div className="cast">
                  <div className="sectionHeader">
                    <h2>Distribution</h2>
                  </div>
                  <CastList id={item.id} />
                </div>
              </div>
            </div>
            <div className="container">
              <section>
                <VideoList id={item.id} />
              </section>
            </div>
          </>
        )
      }
    </>
  )
}

export default Detail