import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../../api/tmdbApi';
import './video-player.scss'

const VideoPlayer = props => {
    const { category } = useParams();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            try {
                const categoryDefault = 'movie';
                if (category) {
                    const res = await tmdbApi.getVideos(category, props.id);
                    setVideos(res.results.slice(0, 1));
                } else {
                    const res = await tmdbApi.getVideos(categoryDefault, props.id);
                    setVideos(res.results.slice(0, 1));
                }
            } catch (error) {
                console.log(error);
            }
        }
        getVideos();
    }, [category, props.id]);

    return (
        <>
            {
                videos.map((item, index) => (
                    <Video key={index} item={item} onClose={props.onClose} />
                ))
            }
        </>
    )
}

const Video = props => {

    const item = props.item;
    const onClose = props.onClose;
    const iframeRef = useRef(null);

    useEffect(() => {

        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);

    }, [item]);

    return (
        <div className="videoPlayer">
            <div className="wrapper">
                <button className="closeButton" onClick={onClose}>
                    Fermer
                </button>
                <iframe
                    src={`https://www.youtube.com/embed/${item.key}`}
                    ref={iframeRef}
                    width="100%"
                    title='video'
                    frameBorder="2"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    )
}

export default VideoPlayer