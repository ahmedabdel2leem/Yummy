// export function searchMeals (box) {
//     console.log(box.innerHTML);
//     box.innerHTML = `
    
//     <div class="d-flex input mx-5">
//     <input type="text" class="form-control text-white" placeholder="Search By Name">
//     <input type="text" class="form-control left text-white" placeholder="Search By First Letter">
//     </div>

//     <div class="row g-3 pt-5" id ='searchBox'>



//     </div>

//     `

// }

import {getId,displayId} from '../JS/item.js';
// import {getId,displayId} from '../JS/item.js';

let search = [];

export async function searchIdFristName(name) {

    let frisNameId = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let {meals} = await frisNameId.json();

    search = meals;
    console.log(meals);

}


export function displaySearch () {

     let item = "" ;
    for (let i = 0; i < search.length; i++) {

        item += `
    
        <div class="col-lg-3 col-md-4">
        
        <div class="inner innerSearch rounded-4" id = ${search[i].idMeal}>
            
                <img src="${search[i].strMealThumb}" alt="Salta"> 
                <div class="layer">                  
                    <h2 class="meal-name">${search[i].strMeal}</h2>
                </div>
            </div>

        </div>

        `;

    }

      
    document.getElementById('searchBox').innerHTML = item;
    document.querySelectorAll('.innerSearch').forEach(e => e.addEventListener('click', async function () {

        let id = this.getAttribute('id')
        await getId(id);
        displayId(meals);

    }));


}

