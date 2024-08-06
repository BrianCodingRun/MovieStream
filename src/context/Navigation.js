import Accueil from '../pages/Accueil'
import Catalog from '../pages/Catalog'
import SearchResults from '../pages/SearchResults'
import WatchList from '../pages/WatchList'
import Detail from '../pages/detail/Detail'

export const nav = [
    // Watchlist
    {
        path: '/watchlist',
        name: "Watchlist",
        element: <WatchList />,
        isAuth: false
    },
    // Search
    {
        path: '/search/:keyword',
        name: "Recherche",
        element: <SearchResults />,
        isAuth: false
    },
    // Detail
    {
        path: '/:category/:id/details',
        name: "Detail",
        element: <Detail />,
        isAuth: false
    },
    // Category
    {
        path: '/:category',
        name: "Catalogue",
        element: <Catalog />,
        isAuth: false
    },
    // Home
    {
        path: '/',
        name: "Accueil",
        element: <Accueil />,
        isAuth: false
    }
]