const AppReducer = (state, action) => {
    // Default State
    switch (action.type) {
        case 'ADD_TO_WATCHLIST':
            return {
                ...state,
                watchlist: [...state.watchlist, action.payload],
                category: action.category,
            }
        case 'REMOVE_FROM_WATCHLIST':
            return {
                ...state,
                watchlist: [...state.watchlist.filter(item => item.id !== action.payload.id)],
            }
        default:
            return state;
    }
}

export default AppReducer;