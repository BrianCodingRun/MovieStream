import React from 'react'
import { Link } from 'react-router-dom'
import apiConfig from '../../api/apiConfig'
import { category } from '../../api/tmdbApi'
import './search-card.scss'

const SearchCard = props => {

    function clickLike(e) {
        let likeIcon = e.target.closest('.likeIcon');
        likeIcon.classList.toggle('active');
    }

    const item = props.item;
    const link = '/' + props.category + '/' + item.id + '/details';

    const runtimeOrEpisodes = props.details.runtime ? props.details.runtime + ' min' : props.details.number_of_episodes + ' épisodes';

    const releaseDate = item.release_date ? item.release_date.split('-').reverse().join('-') : item.first_air_date.split('-').reverse().join('-');

    return (
        <div className='searchCard'>
            <div className="overlay"></div>
            <img
                src={apiConfig.w500Image(item.poster_path || item.backdrop_path)} alt="Poster" />
            <div className='gridItemContent'>
                <div className="headerCard">
                    <div className="title">
                        <h3>
                            {
                                item.title || item.name
                            }
                        </h3>
                        <div className="likeIcon" onClick={clickLike}>
                            <i className='bx bxs-heart'></i>
                        </div>
                    </div>
                    <div className="info">
                        <p>
                            {item.runtime ? 'Durée: ' : 'Episodes: '}
                            <span>{runtimeOrEpisodes}</span>
                        </p>
                        <hr />
                        <p>
                            Sortie: <span>{releaseDate}</span>
                        </p>
                        <hr />
                        <p>
                            Genre: <span>
                                {/* {genres && genres.length > 0 ? genres.map((genre, index) => {
                                    if (index < 2) {
                                        return genre.id === item.genre_ids[0] ? genre.name : null;
                                    }
                                    return null;
                                }) : null} */}
                            </span>
                        </p>
                        <hr />
                        <p>Note:<span>{Math.floor(item.vote_average) + '/10'}</span></p>
                    </div>
                </div>
                <div className="bodyCard">
                    <p>{item.overview ? item.overview.substring(0, 150) + '...' : ''}</p>
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

export default SearchCard