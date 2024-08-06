import React, { createContext, useReducer, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import CookiesReducer from './CookiesReducer';

// Initial state for cookies
const initialCookiesState = {
    cookies: Cookies.get('mic_consent_user') ? JSON.parse(Cookies.get('mic_consent_user')) : { accepted: null }
};

// Create context
export const CookiesContext = createContext(initialCookiesState);

// Provider component
export const CookiesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CookiesReducer, initialCookiesState);
    const [showBanner, setShowBanner] = useState(state.cookies.accepted === null);

    useEffect(() => {
        Cookies.set('mic_consent_user', JSON.stringify(state.cookies), { expires: 1, path: '/', secure: true });
    }, [state.cookies]);

    const acceptCookies = () => {
        dispatch({
            type: 'ACCEPT_COOKIES'
        });
        setShowBanner(false);
    };

    const declineCookies = () => {
        dispatch({
            type: 'DECLINE_COOKIES'
        });
        setShowBanner(false);
    };

    const resetCookies = () => {
        setShowBanner(!showBanner);
    };

    const path = useLocation().pathname;

    useEffect(() => {
        // Afficher le banner à chaque fois que le chemin change et que le cookie est null
        if (path === '/' && state.cookies.accepted === null) {
            setShowBanner(true);
        } else if (path !== '/' && state.cookies.accepted === null) {
            setShowBanner(true);
        }

    }, [path, state.cookies.accepted]);

    return (
        <CookiesContext.Provider
            value={{
                cookies: state.cookies,
                showBanner,
                acceptCookies,
                declineCookies,
                resetCookies
            }}
        >
            {children}
        </CookiesContext.Provider>
    );
};