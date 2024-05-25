const apiKey = '780eec4ee085538c1428df78df020242';
const baseApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
let currentPage = 1;

function fetchMovies(page) {
    const apiUrl = `${baseApiUrl}&page=${page}`;
    
    fetch(apiUrl)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error("Error al cargar los datos de la api");
        })
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card', 'text-bg-dark');
        card.style.width = '400px';
        card.style.margin = "5px";

        const cardImgWrapper = document.createElement('div');
        cardImgWrapper.classList.add('card-img-wrapper');

        const cardImg = document.createElement('img');
        cardImg.classList.add('card-img-top');
        cardImg.src = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path;
        cardImg.alt = movie.title;

        cardImgWrapper.appendChild(cardImg);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-img-overlay', 'd-flex', 'justify-content-center', 'align-items-center');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title', 'text-center');
        cardTitle.textContent = movie.title;

        cardBody.appendChild(cardTitle);

        card.appendChild(cardImgWrapper);
        card.appendChild(cardBody);

        moviesContainer.appendChild(card);
    });
}

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchMovies(currentPage);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentPage++;
    fetchMovies(currentPage);
});

fetchMovies(currentPage);