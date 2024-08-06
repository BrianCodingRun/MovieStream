import React, { useContext } from 'react'
import '../styles/watchlist.scss'
import { GlobalContext } from '../context/AuthWrapper'
import HeaderPage from '../components/headers/HeaderPage'
import Footer from '../components/footer/Footer'
import WatchListCard from '../components/cards/WatchListCard'
import emptyImg from '../assets/images/empty.png'

const WatchList = () => {
    document.title = 'Movie Stream | Ma WatchList'

    const { watchlist, removeFromWatchlist } = useContext(GlobalContext);

    return (
        <React.Fragment>
            <HeaderPage>Ma WatchList</HeaderPage>
            <section className="watchlistSection">
                {
                    watchlist && watchlist.length > 0 ? (
                        <div className='container'>
                            {watchlist.map((item, index) => (
                                <WatchListCard key={index} watchlist={item} onRemove={removeFromWatchlist} category={item.category} />
                            ))}
                        </div>
                    ) : (
                        <div className="noWatchList">
                            <img src={emptyImg} alt="empty" />
                            <h4>Vous n'avez pas de films ou séries dans votre liste</h4>
                        </div>
                    )
                }
            </section>
            <Footer />
        </React.Fragment>
    )
}

export default WatchList