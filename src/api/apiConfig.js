const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '28492537789849449b29ca2ef80136d4',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
}

export default apiConfig;