const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '21721511-ce488bab5f3ab5c9e5600089b';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {

        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
       

       return fetch(url)
        .then(response => response.json())
            .then(data => {
                this.incrementPage();

                return data.hits;
            });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
};
