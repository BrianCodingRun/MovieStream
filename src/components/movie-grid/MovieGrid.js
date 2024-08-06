import React, { useState, useEffect } from 'react'
import './movie-grid.scss'
import MovieCard from '../cards/MovieCard';
import { OutlineButton } from '../button/Button';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';

const MovieGrid = props => {

    const [items, setItems] = useState([]);
    const [genres, setGenres] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);


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

            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.top_rated, { params });
            }
            setTotalPage(response.total_pages);

            const moviesWithGenres = response.results.map((item) => {
                const movieGenres = item.genre_ids.map(id => genres.find(genre => genre.id === id));
                return { ...item, genres: movieGenres };
            })
            setItems(moviesWithGenres);
        }
        getList();
    }, [props.category, genres]);

    const loadMore = async () => {
        let response = null;
        const params = {
            language: 'fr-FR',
            page: page + 1
        };
        switch (props.category) {
            case category.movie:
                response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                break;
            default:
                response = await tmdbApi.getTvList(tvType.top_rated, { params });
        }
        setItems([...items, ...response.results]);
        setPage(page + 1)
    }

    return (
        <>
            <div className='movieGrid'>
                {
                    items.map((item, index) => <MovieCard key={index} category={props.category} item={item} />)
                }
            </div>
            {
                page < totalPage ? (
                    <div className='moreBtn'>
                        <OutlineButton onClick={loadMore}>Voir plus</OutlineButton>
                    </div>
                ) : null
            }
        </>
    )
}

export default MovieGrid