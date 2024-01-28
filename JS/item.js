let Arrea = [];

let mealsObject ;
let newGr = [];
export async function getId(id) { 

    console.log("test1")
    const Api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    console.log("test2");
    let {meals} = await Api.json();
    console.log(meals);
    Arrea = meals;
    mealsObject = meals[0];
    getgraidents()
    console.log('gr',newGr)

}

export  function displayId (Item) {
    Item.innerHTML = `
    
        <div class="col-md-4">
            <img src="${Arrea[0].strMealThumb}" class="rounded-4" alt="Salta">
            <h2>${Arrea[0].strMeal}</h2>
        </div>

        <div class="col-md-8 con">

            <h3 class="fw-medium fs-2">Instructions</h3>
            <p>
                ${Arrea[0].strInstructions}
            </p>

            <h3><span class="fw-bold">Area :</span> ${Arrea[0].strArea}</h3>
            <h3><span class="fw-bold">Category :</span>${Arrea[0].strCategory}</h3>
            <h3><span class="fw-bold">Recipes :</span>${Arrea[0].strArea}</h3>
            <ul class="d-flex" id ="graidents">

            </ul>

            <h3>Tags : </h3>
            <h4 class="fw-light fs-5 mb-4 mt-3">${Arrea[0].strTags}</h4>

            <a href="${Arrea[0].strSource}" target="_blank" class="bg-success py-2 px-3 text-white rounded-2">Source</a>
            <a href="${Arrea[0].strYoutube}" target="_blank" class="bg-danger py-2 px-3 text-white rounded-2">Youtube</a>


        </div>

    `;

    let box = "";

    for (var i = 0; i < newGr.length; i++) { 

       box += `
       
       <li class ="">${newGr[i].value } ${ newGr[i].el} </li>

       `

    }

    document.getElementById('graidents').innerHTML = box

}


function getgraidents(){
    //first
    const gradints = [];

    for (const key in mealsObject) {
      if (key.startsWith('strIngredient')) {
        const keyValueObject = {
          key: key,
          value: mealsObject[key]
        };
        gradints.push(keyValueObject);
      }
    }


//second
    const getmessure = [];

    for (const key in mealsObject) {
      if (key.startsWith('strMeasure')) {
        const keyValueObject = {
          key: key,
          value: mealsObject[key]
        };
        getmessure.push(keyValueObject);
      }
    }

    for (let i = 0; i < gradints.length; i++) {
        const element = gradints[i].value;
        if(gradints[i].value !=''){
            console.log(element , getmessure[i].value)
            const keyValueObject = {
                el: element,
                value: getmessure[i].value
              };
              newGr.push(keyValueObject);

        }
    } 
}

