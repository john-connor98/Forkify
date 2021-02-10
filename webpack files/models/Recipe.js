
export default class Recipe {
    constructor(result, id) {
        this.id = id;
        try {
            this.title = result[id].recipe.label;
            this.author = result[id].recipe.source;
            this.img = result[id].recipe.image;
            this.url = result[id].recipe.url;
            this.ingredients = result[id].recipe.ingredientLines;
        } catch (error) {
//            console.log(error);
            alert('Something went wrong with the recipe :)');
        }
    }
    
    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }
    
    calcServings() {
        this.servings = 4;
    }
    
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'kilograms', 'grams']; 
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'kg', 'g'];
        
        const newIngredients = this.ingredients.map(el => {
            // uniform units
            
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            
            //remove paranthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            
            //parse ingredint into counts
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));
            
            let objIng;
            if(unitIndex > -1) {
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if(arrCount.length  > 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    try { count = eval(arrIng.slice(0, unitIndex).join('+')); } catch (error) { count = arrIng.slice(0, unitIndex).join(' '); } 
                }
                
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(' ')
                }
                
            } else if(parseInt(arrIng[0], 10)) {
                
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if(unitIndex === -1) {
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            return objIng;
            
        });
        this.ingredients = newIngredients;        
    }
    
    updateServings(type) {
        // servings
        const newServings = type === 'dec' ? this.servings-1 : this.servings+1;
        
        //ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });
        
        this.servings = newServings;
    }
    
};
