import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './movie-list.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import tmdbApi, { category } from '../../api/tmdbApi';
import MovieCard from '../cards/MovieCard';

const MovieList = (props) => {

    const [items, setItems] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getGenres = async () => {
            try {
                const response = await tmdbApi.getGenres(props.category, { params: { language: 'fr-FR' } });
                setGenres(response.genres);
            } catch (error) {
                console.error('error', error);
            }
        }
        getGenres();
    }, [props.category]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = { language: 'fr-FR' };

            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, { params });
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            const moviesWithGenres = response.results.map((item) => {
                const movieGenres = item.genre_ids.map(id => genres.find(genre => genre.id === id));
                return { ...item, genres: movieGenres };
            });
            setItems(moviesWithGenres);
        };
        getList();
    }, [props.type, props.category, props.id, genres]);

    const isMobile = () => {
        let isMobileDevice = false;

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            isMobileDevice = true;
        }

        return isMobileDevice;
    }

    return (
        <div className='movieList'>
            <Swiper
                grabCursor={true}
                spaceBetween={isMobile() ? 50 : 30}
                slidesPerView={'auto'}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <MovieCard item={item} category={props.category} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.number,
};

export default MovieList;