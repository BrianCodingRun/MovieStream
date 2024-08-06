import React from 'react'
import { Link } from 'react-router-dom'
import './footer.scss'
import bg from '../../assets/images/MovieGrid.jpg'
import logoWebsite from '../../assets/icons/movie-app-black.png'
import { BsTwitterX, BsInstagram, BsGithub, BsLinkedin } from 'react-icons/bs'

const Footer = () => {
    return (
        <footer className='pageFooter' style={{ backgroundImage: `url(${bg})` }}>
            <div className="footerContainer">
                <div className="footerContent">
                    <div className="footerLeft">
                        <img src={logoWebsite} alt="Logo du site web" />
                        <p>
                            Movie Stream est une application web qui permet de visualiser et de rechercher des films et des séries TV.
                        </p>
                        <div className="follows">
                            <div className="follow">
                                <Link to="https://twitter.com/CoupamaBrian" target="_blank" aria-label='Lien vers le profil Twitter du Développeur'>
                                    <BsTwitterX />
                                </Link>
                            </div>
                            <div className="follow">
                                <Link to="https://www.instagram.com/brian_web_developer/" target="_blank" aria-label='Lien vers le profil Instagram du Développeur'>
                                    <BsInstagram />
                                </Link>
                            </div>
                            <div className="follow">
                                <Link to="https://github.com/Brian027" target="_blank" aria-label='Lien vers le profil Github du Développeur'>
                                    <BsGithub />
                                </Link>
                            </div>
                            <div className="follow">
                                <Link to="https://www.linkedin.com/in/brian-coupama-d%C3%A9veloppeur-fullstack-512644137/" target="_blank" aria-label='Lien vers le profil Linkedin du Développeur'>
                                    <BsLinkedin />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="footerRight">
                        <menu className="menu explore">
                            <li className="title"><h3>Explorer</h3></li>
                            <li><Link to="/movie">Films</Link></li>
                            <li><Link to="/tv">Séries TV</Link></li>
                            <li><Link to="/watchlist">WatchList</Link></li>
                        </menu>
                        <menu className="menu developers">
                            <li className="title"><h3>Pour les Développeurs</h3></li>
                            {/* TMDB API */}
                            <li><Link to="https://developer.themoviedb.org/reference/intro/getting-started" target="_blank" aria-label="Lien vers la documentation de l\'API TMDB">TMDB API</Link></li>
                            {/* React */}
                            <li><Link to="https://fr.legacy.reactjs.org/" target="_blank" aria-label="Lien vers la documentation de React">ReactJS</Link></li>
                            {/* SASS */}
                            <li><Link to="https://sass-lang.com/documentation/" target="_blank" aria-label="Lien vers la documentation de SASS">SASS</Link></li>
                            {/* Context React */}
                            <li><Link to="https://fr.legacy.reactjs.org/docs/context.html#gatsby-focus-wrapper" target="_blank" aria-label="Lien vers la documentation de Context React">Context React</Link></li>
                        </menu>
                    </div>
                </div>
            </div>
            <div className="tags">
                <div className="copyright">
                    <p>© 2023 MovieStream</p>
                </div>
                <p>Made with ❤️ by <Link to="https://briancoupama.re" target='_blank'>Brian Coupama - Développeur Web Fullstack</Link></p>
            </div>
        </footer>
    )
}

export default Footer