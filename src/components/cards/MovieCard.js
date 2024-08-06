import React, { useContext } from 'react';
import './movie-card.scss';
import { Link } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import strawberry from '../../assets/icons/strawberry_icon.png';
import imdbIcon from '../../assets/icons/Imdbicon.png';
import { FaRegBookmark } from "react-icons/fa";
import { GlobalContext } from '../../context/AuthWrapper';

const MovieCard = (props) => {

    const { addToWatchlist, watchlist } = useContext(GlobalContext);

    // Utility function to extract year from date
    const getYear = (date) => {
        return date ? date.split("-")[0] : "N/A";
    };

    let storedWatchlist = watchlist.find(o => o.id === props.item.id);

    const watchListDisabled = storedWatchlist ? true : false;

    return (
        <div className='movieCard'>
            <div className="movieCardBg">
                <img
                    src={apiConfig.w500Image(props.item.poster_path || props.item.backdrop_path)}
                    alt="Poster"
                />
                {/* Add WatchList */}
                <div className="movieCardAddWatchList">
                    <button
                        onClick={() => addToWatchlist(props.item, props.category)}
                        disabled={watchListDisabled}
                        title={watchListDisabled ? "Dans votre watchlist" : "Ajouter à la liste"}
                    >
                        <FaRegBookmark />
                    </button>
                </div>
            </div>
            <div className="movieCardContent">
                {/* Release date France */}
                <p className='movieCardReleaseDate'>
                    FR, {props.item.release_date
                        ? getYear(props.item.release_date)
                        : getYear(props.item.first_air_date)}
                </p>
                {/* Title */}
                <h3>
                    <Link to={`/${props.category}/${props.item.id}/details`}>
                        {props.item.title || props.item.name || props.item.original_title}
                    </Link>
                </h3>
                {/* Rating */}
                <div className="movieCardRating">
                    <div className="movieCardRatingLeft">
                        <img src={imdbIcon} alt="imdb" />
                        <span>{props.item.vote_average.toFixed(2)}/10</span>
                    </div>
                    <div className="movieCardRatingRight">
                        <img src={strawberry} alt="strawberry" />
                        <span>{props.item.vote_count.toLocaleString()}</span>
                    </div>
                </div>
                {/* Genres */}
                <div className="movieCardGenres">
                    {props.item && props.item.genres && props.item.genres.slice(0, 3).map((genre) => (
                        genre && genre.name && (
                            <span key={genre.id}>
                                {genre.name.length > 10 ? genre.name.substring(0, 10) + '...' : genre.name}
                            </span>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieCard;