import React from 'react';
import './result-search.scss'
import Input from '../input/Input'
import Button from '../button/Button';

const ResultSearch = () => {

    return (
        <section className="resultSearch">
            <div className="headerSearchResult">
                <div className='headerSearchResultInfo'>
                    <h2 className='headerSearchResultTitle'>
                        Liste de contenu selon votre recherche <span>Avengers</span>
                    </h2>
                </div>
                <div className="searchInput">
                    <Input
                        type='text'
                        placeholder='Rechercher un film, une série...'
                        className='searchInput'
                    />
                    <div className="close">
                        <Button className='closeButton'>
                            Fermer
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResultSearch