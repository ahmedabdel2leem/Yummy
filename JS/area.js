import {getId, displayId} from "../JS/item.js"
let aryData = [];

export async function conunts () {

    
    let conuntrs = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let {meals} = await conuntrs.json();
    // console.log(categories, 'categories');
    return meals;

}

export async function contryAare (name) {

    let areyApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);
    let {meals} = await areyApi.json();
    aryData = meals

}



export  function aeaydisplay (meals) {

    // let catName =  categoriesName();

    console.log(aryData);
    let box = '';

    for(let i = 0 ; i < aryData.length ; i++) {

        box += `
    
        <div class="col-lg-3 col-md-4">
        
        <div class="inner innerSearch rounded-4" id = ${aryData[i].idMeal}>
            
                <img src="${aryData[i].strMealThumb}" alt="Salta"> 
                <div class="layer">                  
                    <h2 class="meal-name">${aryData[i].strMeal}</h2>
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