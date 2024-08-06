import React, { useContext } from 'react'
import './cookie-widget.scss'
import { CookiesContext } from '../../context/CookiesContext';
import cookieImg from '../../assets/images/AmericanCookie.png'

const CookieWidget = () => {
    const { resetCookies } = useContext(CookiesContext);

    const isMobile = () => {
        let isMobileDevice = false;

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            isMobileDevice = true
        }

        return isMobileDevice;
    }

    return (
        <div className='cookieWidget'>
            <button
                className='cookieButton'
                onClick={resetCookies}
                aria-label={!isMobile() ? '' : 'Afficher la bannière de cookie'}
            >
                {
                    !isMobile() ? (
                        <span>Gérer le consentement</span>
                    ) : (
                        <img src={cookieImg} alt="Icone Cookie cliqué ici pour ouvrir la bannière de consentement" />
                    )
                }
            </button>
        </div>
    )
}

export default CookieWidget