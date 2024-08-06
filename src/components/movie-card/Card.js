import React from 'react';
import './card.scss';
import { Link } from 'react-router-dom';
import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const Card = props => {

    function clickLike(e) {
        let likeIcon = e.target.closest('.likeIcon');
        likeIcon.classList.toggle('active');
    }

    const item = props.item;
    const genres = props.genres;
    const link = '/' + category[props.category] + '/' + item.id + '/details';

    // Trouver les détails correspondants à l'élément actuel
    const detail = props.details.find(detail => detail.id === item.id);

    // Les détails seront disponibles une fois qu'ils seront récupérés depuis l'API
    const runtimeOrEpisodes = detail ? (props.category === category.movie ? detail.runtime + ' min' : detail.number_of_episodes + ' épisodes') : '';
    const releaseDate = item.release_date ? item.release_date.split('-').reverse().join('-') : item.first_air_date.split('-').reverse().join('-');

    return (
        <div className='flexItem'>
            <div className="overlay"></div>
            <img
                src={apiConfig.w500Image(item.poster_path || item.backdrop_path)} alt="Poster" />
            <div className='gridItemContent'>
                <div className="headerCard">
                    <div className="title">
                        <h3>
                            {
                                detail ? (detail.title || detail.name) : null
                            }
                        </h3>
                        <div className="likeIcon" onClick={clickLike}>
                            <i className='bx bxs-heart'></i>
                        </div>
                    </div>
                    <div className="info">
                        <p>
                            {detail && detail.runtime ? 'Durée: ' : 'Episodes: '}
                            <span>{runtimeOrEpisodes}</span>
                        </p>
                        <hr />
                        <p>
                            Sortie: <span>{releaseDate}</span>
                        </p>
                        <hr />
                        <p>
                            Genre: <span>
                                {genres && genres.length > 0 ? genres.map((genre, index) => {
                                    if (index < 2) {
                                        return genre.id === item.genre_ids[0] ? genre.name : null;
                                    }
                                    return null;
                                }) : null}
                            </span>
                        </p>
                        <hr />
                        <p>Note:<span>{Math.floor(item.vote_average) + '/10'}</span></p>
                    </div>
                </div>
                <div className="bodyCard">
                    <p>{item.overview.substring(0, 150) + '...'}</p>
                </div>
                <div className="footerCard">
                    <button>
                        <Link to={link}>
                            Details
                        </Link>
                    </button>
                    <button>Bande Annonce</button>
                </div>
            </div>
        </div>
    )
}

export default Card;