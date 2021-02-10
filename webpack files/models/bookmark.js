export default class Bookmarks {
    constructor() {
        this.bookmarks = [];
    }
    
    addBookmark(id, title, author, img) {
        const bookmark = { id, title, author, img};
        this.bookmarks.push(bookmark);
        
        // persist data in localstorage
        this.persistData();
        
        return bookmark;
    }
    
    deleteBookmark(id) {
        const index = this.bookmarks.findIndex(el => el.id === id);
        this.bookmarks.splice(index, 1);
        
        // persist data in localstorage
        this.persistData();
    }
    
    isBookmarked(id) {
        return this.bookmarks.findIndex(el => el.id === id) !== -1;
    }
    
    getNumbookmarks() {
        return this.bookmarks.length;
    }
    
    persistData() {
        localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    }
    
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('bookmarks'));
        if(storage) this.bookmarks = storage;
    }
}