import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../../api/tmdbApi';

const VideoList = props => {

    const { category } = useParams();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            try {
                const res = await tmdbApi.getVideos(category, props.id);
                setVideos(res.results.slice(0, 5));
            } catch (error) {
                console.log(error);
            }
        };
        getVideos();
    }, [category, props.id]);

    return (
        <>
            {
                videos.map((item, index) => (
                    <Video key={index} item={item} />
                ))
            }
        </>
    )
}

const Video = props => {

    const item = props.item;
    const iframeRef = useRef(null);

    useEffect(() => {

        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);

    }, [item]);

    return (
        <div className="video">
            <div className="videoTitle">
                <h2>{item.name}</h2>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                ref={iframeRef}
                width="100%"
                title='video'
                frameBorder="2"
                allowFullScreen
            ></iframe>
        </div>
    )
}

export default VideoList