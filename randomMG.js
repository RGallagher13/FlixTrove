const apiKey = 'ac7b3e63041ab5c8a88c66a482805cd8';
const movieContainer = document.getElementById('movie-container');
const generateMovieBtn = document.getElementById('generate-movie-btn');

generateMovieBtn.addEventListener('click', fetchRandomMovie);

async function fetchRandomMovie() {
    const randomPage = Math.floor(Math.random() * 500) + 1;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${randomPage}&certification_country=US&certification.lte=R&with_original_language=en`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const movies = data.results;
        const randomIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomIndex];
        const movieDetails = await fetchMovieDetails(randomMovie.id);
        displayMovie(movieDetails);
    } catch (error) {
        console.error('Error fetching random movie:', error);
    }
}

async function fetchMovieDetails(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=release_dates`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

function displayMovie(movie) {
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const usRelease = movie.release_dates.results.find(release => release.iso_3166_1 === 'US');


    movieContainer.innerHTML = `
        <h3>${movie.title}</h3>
        <img src="${imageUrl}" alt="${movie.title} poster" />
        <p>Release Date: ${movie.release_date}</p>
    `;
}