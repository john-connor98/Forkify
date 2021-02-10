//global app controler
import Search from './models/search';
import * as searchView from './views/searchview';
import * as recipeView from './views/recipeview';
import * as bookmarkView from './views/bookmarkView';
import { elements, renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';
import Bookmarks from './models/bookmark';

/* global state of the app
search object
curretn recipe object 
shoping list object
liked recipes
*/
const state = {};

const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput();
     
    if(query) {
        // new search object and add to state
        state.search = new Search(query);
        // prepare ui for result
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchRes);
        try {
            //search for recipes
            await state.search.getResults();
            // render result on ui
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch(error) {
            alert('Something went wrong with the search...');
            clearLoader();
        }
        
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn--inline');
    e.stopImmediatePropagation();
    if(btn) {
        const gotopage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResults(state.search.result, gotopage);
    }
});

// Recipe controller
const controlRecipe = () => {
    event.stopImmediatePropagation();
    const id = window.location.hash.replace('#','');
    
    
    if(id) {
        try {
            //prepare ui for changes
            recipeView.clearRecipe();
            renderLoader(elements.recipe);
            
            // highlight selected search item
            if(state.search)
            searchView.highlightSelected(id);
            
            //create new recipe object and get recipe data
            state.recipe = new Recipe(state.search.result, id);
            state.recipe.parseIngredients();
            
            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.bookmarks.isBookmarked(id));
            
        } catch (error) {
//            console.log(error);
            alert('Error processing recipe!');
        }
    }
};

['hashchange'].forEach(event => window.addEventListener(event, controlRecipe)); //, 'load'

// bookmark handling

const controlBookmark = () => {
    if(!state.bookmarks) state.bookmarks = new Bookmarks();
    const currentID = state.recipe.id;
    
    // user has not bookmarked the recipe yet 
    if(!state.bookmarks.isBookmarked(currentID)) {
        // add bookmark to the state
        const newBookmark = state.bookmarks.addBookmark(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        
        // toggle the button
        bookmarkView.togglebookmarkBtn(true);
        
        // add bookmark to ui list
        bookmarkView.renderBookmark(newBookmark, state.bookmarks.getNumbookmarks());
//        console.log(state.bookmarks);
    } else {
        // remove bookmark to the state
        state.bookmarks.deleteBookmark(currentID);
        
        // toggle the button
        bookmarkView.togglebookmarkBtn(false);
        
        // remove bookmark from ui list
        bookmarkView.deleteBookmark(currentID);
//        console.log(state.bookmarks);
    }
    
 bookmarkView.toggleBookmarkMenu(state.bookmarks.getNumbookmarks());
};

// Restore bookmark on page loads
window.addEventListener('load', ek => {
    ek.stopImmediatePropagation();
    state.bookmarks = new Bookmarks();
    
    // restore bookmark
    state.bookmarks.readStorage();
    
    // toggle bookmark menu
    bookmarkView.toggleBookmarkMenu(state.bookmarks.getNumbookmarks());
    
    // render the existing bookmark
    state.bookmarks.bookmarks.forEach(bookmark => bookmarkView.renderBookmark(bookmark));
});

// handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn--decrease-servings, .btn--decrease-servings *')) {
        e.stopImmediatePropagation();
        // decrease button clicked
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec'); 
            recipeView.updateServingsIngredients(state.recipe);
        }
    }   
});
    
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn--increase-servings, .btn--increase-servings *')) {
        e.stopImmediatePropagation();
        // increase button clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if(e.target.matches('.btn--round, .btn--round *')) {
        e.stopImmediatePropagation();
        // Bookmark controller
        controlBookmark();
    }
});