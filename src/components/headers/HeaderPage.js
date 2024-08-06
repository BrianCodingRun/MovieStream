import React from 'react';
import './header-page.scss';
import bg from '../../assets/images/MovieGrid.jpg';

const HeaderPage = props => {

    return (
        <div className='pageHeader' style={{ backgroundImage: `url(${bg})` }}>
            <h2>{props.children}</h2>
        </div>
    )
}

export default HeaderPage