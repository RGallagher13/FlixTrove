const apiKey = 'ac7b3e63041ab5c8a88c66a482805cd8'; //Code which gives me access to the API
const movieContainer = document.getElementById('movie-container'); //Selects HTML element 
const generateMovieBtn = document.getElementById('generate-movie-btn'); //Selects HTML element

generateMovieBtn.addEventListener('click', fetchRandomMovie); //After button is clicked, next part of script runs

//Fetches data from API
async function fetchRandomMovie() {
    const randomPage = Math.floor(Math.random() * 500) + 1; //Picking a random number whcih will be associated with a movie
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${randomPage}&certification_country=US&certification.lte=R&with_original_language=en`; //Where to fetch data from

    try {
        const response = await fetch(url); //Sends a request to the url above
        const data = await response.json(); 
        const movies = data.results; //Extracts array of movies from the data delivered from the API
        const randomIndex = Math.floor(Math.random() * movies.length); //Generates a random movie
        const randomMovie = movies[randomIndex]; 
        const movieDetails = await fetchMovieDetails(randomMovie.id); //Triggers function below to fetch additional details of the selected movie
        displayMovie(movieDetails); //Triggers displayMovie function below
    } catch (error) {
        console.error('Error fetching random movie:', error); //Displays if an error happens and cannot fetch a movie
    }
}

//Fetches movie details for the random movie selected above
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

//Displays movie poster and release date from movie selected
function displayMovie(movie) {
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const usRelease = movie.release_dates.results.find(release => release.iso_3166_1 === 'US');


    movieContainer.innerHTML = `
        <h3>${movie.title}</h3>
        <img src="${imageUrl}" alt="${movie.title} poster" />
        <p>Release Date: ${movie.release_date}</p>
    `;
}