import React, { useEffect, useState } from 'react';
import '../styles/search-results.scss';
import HeaderPage from '../components/headers/HeaderPage';
import { useParams } from 'react-router-dom';
import tmdbApi from '../api/tmdbApi';
import MovieCard from '../components/cards/MovieCard';
import Footer from '../components/footer/Footer';

const SearchResults = () => {
    const { keyword } = useParams();
    const [state, setState] = useState({
        genresMovie: [],
        genresTv: [],
        items: [],
        totalResults: 0,
        page: 1
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Récupère les genres pour les films et les séries
    useEffect(() => {
        const getGenres = async () => {
            try {
                const [movieGenresResponse, tvGenresResponse] = await Promise.all([
                    tmdbApi.getGenres('movie', { params: { language: 'fr-FR' } }),
                    tmdbApi.getGenres('tv', { params: { language: 'fr-FR' } })
                ]);

                setState(prevState => ({
                    ...prevState,
                    genresMovie: movieGenresResponse.genres,
                    genresTv: tvGenresResponse.genres
                }));
            } catch (error) {
                console.error('error', error);
            }
        };
        getGenres();
    }, []);

    useEffect(() => {
        const fetchSearch = async () => {
            if (keyword) {
                const params = {
                    query: keyword,
                    language: 'fr-FR',
                    page: state.page
                };
                try {
                    const response = await tmdbApi.search('multi', { params });

                    // Associe les genres aux items récupérés
                    const moviesWithGenres = response.results.map((item) => {
                        const genres = item.genre_ids.map(id => {
                            if (item.media_type === 'movie') {
                                return state.genresMovie.find(genre => genre.id === id);
                            } else {
                                return state.genresTv.find(genre => genre.id === id);
                            }
                        }).filter(genre => genre); // Filtre les genres non trouvés

                        return { ...item, genres };
                    });

                    setState(prevState => ({
                        ...prevState,
                        totalResults: response.total_results,
                        items: moviesWithGenres
                    }));
                } catch (error) {
                    console.error('Une erreur s\'est produite lors de la recherche:', error);
                }
            }
        };
        fetchSearch();
    }, [keyword, state.page, state.genresMovie, state.genresTv]);

    return (
        <>
            <HeaderPage>
                Résultats de recherche pour <span className='keyword'>"{keyword}"</span>
            </HeaderPage>
            <section className="searchResult">
                <div className="searchResultContainer">
                    {
                        state.items.map((item, index) => (
                            <MovieCard key={index} category={item.media_type} item={item} />
                        ))
                    }
                </div>
            </section>
            <Footer />
        </>
    );
};

export default SearchResults;