import React, { useState, useEffect } from 'react'
import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import './hero.scss';

const Hero = props => {

    const [item, setItem] = useState([]);
    const [current, setCurrent] = useState(0);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        switch (props.category) {
            case category.movie:
                const getMovies = async () => {
                    const params = { page: 1, language: "fr-FR" };
                    try {
                        const response = await tmdbApi.getMoviesList(movieType.top_rated, { params });
                        setItem(response.results.slice(0, 8));
                    } catch {
                        console.log("error");
                    }
                };
                getMovies();
                break;
            case category.tv:
                const getTv = async () => {
                    const params = { page: 1, language: "fr-FR" };
                    try {
                        const response = await tmdbApi.getTvList(movieType.top_rated, { params });
                        setItem(response.results.slice(0, 8));
                    } catch {
                        console.log("error");
                    }
                };
                getTv();
                break;
            default:
                break;
        }
    }, [props.category]);

    // Récupérer les details
    const getDetails = async (id) => {
        const params = { language: 'fr-FR' }
        const response = await tmdbApi.detail(props.category, id, { params })
        setDetails(response);
    };

    useEffect(() => {
        if (item.length > 0) {
            getDetails(item[current].id)
        }
    }, [current, item])

    useEffect(() => {

        const interval = setInterval(() => {
            setCurrent((current) => (current + 1) % item.length)
        }, 5000);

        return () => clearInterval(interval);
    }, [item]);

    if (item.length === 0) {
        return null;
    }

    const currentItem = item[current];

    return (
        <div className='movieHero'>
            <div className="background">
                <img
                    src={apiConfig.originalImage(currentItem.backdrop_path)}
                    alt={currentItem.title}
                />
            </div>
            <div className="content">
                <div className="left">
                    <img
                        src={apiConfig.w500Image(currentItem.poster_path)}
                        alt=""
                    />
                </div>
                <div className="right">
                    <h1>
                        {props.category === category.movie ? currentItem.title : currentItem.name}
                    </h1>
                    <div className="genres">
                        {
                            details && details.genres.map((genre) => (
                                <span key={genre.id}>{genre.name}</span>
                            ))
                        }
                    </div>
                    <div className="rating">
                        <div className="circle">
                            <div className="outer">
                                <div className="inner">
                                    <span>{Math.floor(currentItem.vote_average)}</span>
                                </div>
                            </div>
                        </div>
                        <p>Note des utilisateurs</p>
                    </div>
                    <div className="overview">
                        <h3>Synopsis</h3>
                        <p>{currentItem.overview.substring(0, 300) + "..."}</p>
                    </div>
                    <div className="actor">
                        <div className="actorList">
                            {/* {
                                    credits && credits.cast.slice(0, 8).map((actor) => (
                                        <div className="actorItem" key={actor.id}>
                                            <p>{actor.name}</p>
                                            <span>{actor.character}</span>
                                        </div>
                                    ))
                                } */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero