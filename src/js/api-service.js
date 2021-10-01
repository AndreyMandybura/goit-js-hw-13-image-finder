export default class ApiService {
constructor() {
    this.searchQuery = '';
    this.API_KEY = '23647546-0c9963079c4ed781ee6b1e575';
    this.BASE_URL = 'https://pixabay.com/api/';
    this.page = 1;
}

    async fetchImage() {
        const url = `${this.BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${this.API_KEY}`
        const response = await fetch(url);
        const data = await response.json();
        this.incrementPage();
        return data.hits;
    }

    incrementPage (){
        this.page += 1;
    }

    resetPage () {
        this.page = 1;
    }

    get query () {
        return this.searchQuery
    }

    set query (newQuery){
        this.searchQuery = newQuery
    }
}