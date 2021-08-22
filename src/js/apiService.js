const apiService = {

    searchQuery: '',
    pageNumber: 1,

    async fetchPhotos() {
        
        const key = "23036221-d804a8a78d7b0866edf7d8fc3";
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=12&key=${key}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            this.pageNumber++;
            return data.hits;
        } catch (err) {
            console.log(err)
        }
            
    },

    resetPage() {
        this.pageNumber = 1;
    },

    get query() {
        return this.searchQuery;
    },

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    
}

export default apiService;