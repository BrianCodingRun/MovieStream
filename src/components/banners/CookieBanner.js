import React, { useContext } from 'react';
import './banner.scss';
import { IoClose } from "react-icons/io5";
import { CookiesContext } from '../../context/CookiesContext';

const CookieBanner = () => {
    const { showBanner, acceptCookies, declineCookies, resetCookies } = useContext(CookiesContext);

    if (!showBanner) return null;

    return (
        <div className="bannerCookies">
            <div className="bannerContainer">
                <button className="close" onClick={resetCookies}><IoClose /></button>
                <div className="content">
                    <h2>Gérer le consentement</h2>
                    <p>Le site web nécessite l'utilisation de votre microphone pour la fonctionnalité de recherche vocale. En appuyant sur "Accepter", vous autorisez le site à accéder à la fonctionnalité de recherche vocale. Aucune donnée personnelle n'est collectée. Votre consentement est stocké pendant 30 jours et est supprimé automatiquement.</p>
                    <div className="consentActions">
                        <button className="decline" onClick={declineCookies}>Refuser</button>
                        <button className="accept" onClick={acceptCookies}>Accepter</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CookieBanner;