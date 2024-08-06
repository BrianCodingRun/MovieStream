const CookiesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COOKIES':
            return {
                ...state,
                cookies: action.payload,
            }
        case 'ACCEPT_COOKIES':
            return {
                ...state,
                cookies: {
                    ...state.cookies,
                    accepted: true,
                },
            }
        case 'DECLINE_COOKIES':
            return {
                ...state,
                cookies: {
                    ...state.cookies,
                    accepted: false,
                },
            }
        default:
            return state;
    }
}

export default CookiesReducer;