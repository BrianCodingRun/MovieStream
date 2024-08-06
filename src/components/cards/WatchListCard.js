import React, { useState, useEffect } from 'react'
import './watchlist-card.scss'
import { Link } from 'react-router-dom'
import apiConfig from '../../api/apiConfig'
import strawberry from '../../assets/icons/strawberry_icon.png'
import imdbIcon from '../../assets/icons/Imdbicon.png'
import { FaRegTrashAlt } from 'react-icons/fa'
import tmdbApi from '../../api/tmdbApi'

const WatchListCard = (props) => {

    const [details, setDetails] = useState([]);

    useEffect(() => {
        const getDetails = async () => {
            try {
                const params = { language: 'fr-FR' };
                const response = await tmdbApi.detail(props.category, props.watchlist.id, { params });
                setDetails(response);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        getDetails();

    }, [props.category, props.watchlist.id]);

    // Utility function to extract year from date
    const getYear = (date) => {
        return date ? date.split("-")[0] : "N/A";
    };

    let titleItem = props?.watchlist?.title?.length > 15 ? props.watchlist.title.substring(0, 15) + "..." : props.watchlist.title;
    if (!titleItem) {
        titleItem = props?.watchlist?.name?.length > 15 ? props.watchlist.name.substring(0, 15) + "..." : props.watchlist.name;
    }
    if (!titleItem) {
        titleItem = props?.watchlist?.original_title?.length > 15 ? props.watchlist.original_title.substring(0, 15) + "..." : props.watchlist.original_title;
    }

    return (
        <div className='watchlistCard'>
            <div className="watchlistCardBg">
                <img
                    src={apiConfig.w500Image(props.watchlist.poster_path || props.watchlist.backdrop_path)}
                    alt="Poster"
                />
                {/* Add WatchList */}
                <div className="watchlistCardAction">
                    <button onClick={() => props.onRemove(props.watchlist)} title='Supprimer de la liste'>
                        <FaRegTrashAlt />
                    </button>
                </div>
            </div>
            <div className="watchlistCardContent">
                {/* Release date France */}
                <p className='watchlistCardReleaseDate'>
                    FR, {props.watchlist.release_date
                        ? getYear(props.watchlist.release_date)
                        : getYear(props.watchlist.first_air_date)}
                </p>
                {/* Title */}
                <h3>
                    <Link
                        to={!props.category ? `/movie/${props.watchlist.id}/details` : `/${props.category}/${props.watchlist.id}/details`}
                    >
                        {titleItem}
                    </Link>
                </h3>
                {/* Rating */}
                <div className="watchlistCardRating">
                    <div className="watchlistCardRatingLeft">
                        <img src={imdbIcon} alt="imdb" />
                        <span>{props.watchlist.vote_average.toFixed(2)}/10</span>
                    </div>
                    <div className="watchlistCardRatingRight">
                        <img src={strawberry} alt="strawberry" />
                        <span>{props.watchlist.vote_count.toLocaleString('fr-FR')}</span>
                    </div>
                </div>
                {/* Genres */}
                <div className="watchlistCardGenres">
                    {details && details.genres && details.genres.slice(0, 3).map((genre) => (
                        genre && genre.name && (
                            <span key={genre.id}>
                                {genre.name.length > 10 ? genre.name.substring(0, 15) + '...' : genre.name}
                            </span>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WatchListCard