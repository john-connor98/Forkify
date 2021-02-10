import { elements } from './base';
import { limitRecipeTitle } from './searchview';

export const togglebookmarkBtn = isbookmarked => {
    const iconString = isbookmarked ? 'filledheart' : 'linedheart';
    document.querySelector('.btn--round img').setAttribute('src', `./img/${iconString}.png`);
};

export const toggleBookmarkMenu = numBookmarks => {
    elements.bookmarkMenu.style.visibility = numBookmarks > 0 ? 'visible' : 'hidden';
};

export const renderBookmark = (bookmark, num_bookmark) => {
    if(num_bookmark == 1) {
        const mark = elements.bookmarkInitial;
        if(mark) mark.parentElement.removeChild(mark);
    }
    const markup = `
        <li class="preview">
            <a class="preview__link" href="#${bookmark.id}">
                <figure class="preview__fig">
                    <img src="${bookmark.img}" alt="${bookmark.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${limitRecipeTitle(bookmark.title)}</h4>
                    <p class="preview__author">${bookmark.author}</p>
                </div>
            </a>
        </li>
    `;
    elements.bookmarkList.insertAdjacentHTML('beforeend', markup);    
};

export const deleteBookmark = id => {
    const el = document.querySelector(`.preview__link[href*="#${id}"]`).parentElement;
    if(el) el.parentElement.removeChild(el);
}
