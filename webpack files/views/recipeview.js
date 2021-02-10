import { elements } from './base';
import { Fraction } from 'fractional';

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
};

const formatCount = count => {
    if(count) {
        const newCount = Math.round(count * 100) / 100;
        const [int, dec] = newCount.toString().split('.').map(el => parseInt(el, 10));
        if(!dec) return newCount;
        
        if(int == 0) {
            const fr = new Fraction(newCount);
            return `${fr.numerator}/${fr.denominator}`;
        } else {
            const fr = new Fraction(newCount - int);
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }
    } 
    return '?';
}

const createIngredient = ingredient => `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <img src="./img/tick.png#icon-check" style="height: 25px">
          </svg>
          <div class="recipe__quantity">${formatCount(ingredient.count)}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
          </div>
        </li>
    `;

export const renderRecipe = (recipe, bookmarked) => {
    const markup = `
        <figure class="recipe__fig">
          <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <img src="./img/clock1.svg#icon-clock">
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <img src="./img/user.svg#icon-users">
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--decrease-servings">
                  <img src="./img/minus.svg#icon-minus-circle">
              </button>
              <button class="btn--tiny btn--increase-servings">
                  <img src="./img/plus.svg#icon-plus-circle">
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
          </div>
          <button class="btn--round">
              <img src="./img/${bookmarked ? 'filledheart' : 'linedheart'}.png">
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(el => createIngredient(el)).join('')}
            
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.author}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.url}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <img src="./img/direction.svg#icon-arrow-right" style="width: 35px">
            </svg>
          </a>
        </div>
    `;
    
    elements.recipe.insertAdjacentHTML('afterbegin', markup);
};

export const updateServingsIngredients = recipe => {
    // update count
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
    
    // update ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__quantity'));
    countElements.forEach((el, i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
    });
};








