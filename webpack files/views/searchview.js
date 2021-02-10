import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};
 
export const clearResult = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultArr = Array.from(document.querySelectorAll('.preview__link'));
    resultArr.forEach(el => {
        el.classList.remove('preview__link--active');
    });    
    document.querySelector(`.preview__link[href*="#${id}"]`).classList.add('preview__link--active');
};

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;            
        }, 0);
        return `${newTitle.join(' ')} ...`;
    } 
    return title;
};

const renderRecipe = (recipe_detail, index) => {
    const markup = `
        <li class="preview">
            <a class="preview__link" href="#${index}">
                <figure class="preview__fig">
                <img src="${recipe_detail.recipe.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${limitRecipeTitle(recipe_detail.recipe.label)}</h4>
                    <p class="preview__publisher">${recipe_detail.recipe.source}</p>
                    <div class="preview__user-generated">
                        <svg>
                            <use></use>
                        </svg>
                    </div>
                </div>
            </a>
        </li>
    `;
    
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// type can be `prev` or `next`
/*
<svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        */
const createButton = (page, type) => `
    <button class="btn--inline pagination__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1}>
        <span>Page ${type === 'prev' ? page-1 : page+1}</span>
    </button>
`;

const renderButtons = (page, numResults, resperpage) => {
    const pages = Math.ceil(numResults / resperpage);
    
    let button;
    if(page === 1) {
        button = createButton(page, 'next');
    } else if(page < pages) {
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
            
    } else if(page == pages && pages > 1) {
        button = createButton(page, 'prev');
    }
    
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resperpage = 10) => {
    const start = (page -1) * resperpage;
    const end = page * resperpage;
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resperpage);
};

