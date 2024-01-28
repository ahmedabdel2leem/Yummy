import { getId, displayId } from "../JS/item.js";
let catName = [];
export async function ingredientsAll() {

    let ingredientsAll = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let {meals} = await ingredientsAll.json();
    // console.log(categories, 'categories');
    return meals;
}

export async function ingredientsName (id) {

    let categoriesAll = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`);
    let {meals} = await categoriesAll.json();
    catName = meals
    // return meals;
    // console.log(meals, 'categories');

}

export  function ingredientsNamedisplay (meals) {


    // console.log(catName);
    let box = '';

    for(let i = 0 ; i < catName.length ; i++) {

        box += `
    
        <div class="col-lg-3 col-md-4">
        
        <div class="inner innerSearch rounded-4" id = ${catName[i].idMeal}>
            
                <img src="${catName[i].strMealThumb}" alt="Salta"> 
                <div class="layer">                  
                    <h2 class="meal-name">${catName[i].strMeal}</h2>
                </div>
            </div>

        </div>
        `
    }

    meals.innerHTML = box;

    document.querySelectorAll('.innerSearch').forEach(e => e.addEventListener('click', async function () {

        let id = this.getAttribute('id')
        await getId(id);
        displayId(meals);

    }));


}