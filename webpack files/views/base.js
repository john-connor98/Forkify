export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results'),
    searchRes: document.querySelector('.search-results'),
    searchResPages: document.querySelector('.pagination'),
    recipe: document.querySelector('.recipe'),
    bookmarkMenu: document.querySelector('.nav__item2'),
    bookmarkList: document.querySelector('.bookmarks__list'),
    bookmarkInitial: document.querySelector('.message')
};

export const elementStrings = {
    spinner: 'spinner'
};

export const renderLoader = parent => {
    const spinner = `
        <div class="${elementStrings.spinner}">
            <svg>
                <img src="./img/25.svg#icon-loader">
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', spinner);
};

export const clearLoader = () => {
    const spinner = document.querySelector(`.${elementStrings.spinner}`);
    if(spinner) spinner.parentElement.removeChild(spinner);    
};