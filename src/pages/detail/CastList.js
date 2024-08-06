import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const CastList = props => {

    const { category } = useParams();
    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            try {
                const res = await tmdbApi.credits(category, props.id);
                setCasts(res.cast.slice(0, 6))
            } catch (error) {
                console.log(error);
            }
        };
        getCredits();
    }, [category, props.id]);

    return (
        <div className='casts'>
            {
                casts.map((item, index) => (
                    <div key={index} className="castsItem">
                        <div className="castsItemImg" style={{
                            backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`
                        }}></div>
                        <div className="identity">
                            <p className="castsItemCharacter">{item.character}</p>
                            <p className="castsItemName">{item.name}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CastList