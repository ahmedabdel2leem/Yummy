import {getId,displayId} from '../JS/item.js';
import {searchIdFristName,displaySearch} from '../JS/search.js';
import {categoriesAll , categoriesName , categoriesdisplay} from '../JS/categories.js';
import {conunts , aeaydisplay , contryAare} from '../JS/area.js';
import {ingredientsAll , ingredientsName ,ingredientsNamedisplay} from '../JS/ingredients.js';

let meals = document.getElementById('meals');
let categories = document.getElementById('categories');
let ingredients = document.getElementById('ingredients');
let loading = document.querySelector('.loading-screen');
let AllMeals = [];

let area = document.getElementById('area');

$('.open-close-icon').on('click', function (e) {

    if ($('.side-nav-menu').position().left === -250) {

        $('.side-nav-menu').animate({left: '0'});

    } else {

        $('.side-nav-menu').animate({left: '-250'});

    }


})


async function getMealAll () {

    loading.classList.remove('d-none');

    let MealAll = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
        let {meals} = await MealAll.json();
        
        AllMeals = meals
        console.log(AllMeals);
        getdisplayMeals();
        loading.classList.add('d-none');

}

getMealAll();

function getdisplayMeals () {

    let displayMeals = "";
    for (let i = 0; i < AllMeals.length; i++) {

        displayMeals += `
        
            <div class="col-lg-3 col-md-4">

            <div class="inner rounded-4" id="${AllMeals[i].idMeal}">
                
                <img src="${AllMeals[i].strMealThumb}" alt="Salta"> 
                <div class="layer">                  
                    <h2 class="meal-name">${AllMeals[i].strMeal}</h2>
                </div>
            </div>

        </div>
        

        `

    }

    meals.innerHTML = displayMeals;
    document.querySelectorAll('.inner').forEach(e => e.addEventListener('click', async function () {

        let id = this.getAttribute('id')
        await getId(id);
        displayId(meals);

    }));

}

let search = document.getElementById('search');

// search.onclick= searchMeals(meals)

search.onclick= function searchMeals () {

    loading.classList.remove('d-none');
    meals.innerHTML = `
    
    <div class="d-flex input mx-5">
    <input type="text" class="form-control text-white" placeholder="Search By Name" id="searchName">
    <input type="text" class="form-control left text-white" placeholder="Search By First Letter" id="searchFirstName">
    </div>

    <div class="row g-3 pt-5" id ='searchBox'>



    </div>

    `
    loading.classList.add('d-none');
    document.getElementById('searchName').addEventListener('input', function (e) {

        loading.classList.remove('d-none');
        searchIdFristName(e.target.value);
        displaySearch(meals);
        loading.classList.add('d-none');
        // console.log(e.target.value);

    })


}

categories.onclick = async function (e) {

    loading.classList.remove('d-none');
    let catALL= await categoriesAll();

        let categorie = "";

    for (let i = 0; i < catALL.length; i++) {

        categorie += `
        
        <div class="col-lg-3 col-md-4">
    
        <div class="inner rounded-4" id='${catALL[i].strCategory}'>
            
            <img src="${catALL[i].strCategoryThumb}" alt="beef"> 
            <div class="layer flex-column px-2">                  
                <h2 class="meal-name">${catALL[i].strCategory}</h2>
                <p class = "text-black">${catALL[i].strCategoryDescription}</p>
            </div>
            </div>

        </div>

        `

    }

    meals.innerHTML = categorie;
    loading.classList.add('d-none');

    document.querySelectorAll('.inner').forEach(e => e.addEventListener('click', async function () {

        loading.classList.remove('d-none');
        let cat = this.getAttribute('id');
        console.log(cat);
        await categoriesName(cat);
        categoriesdisplay(meals);
        loading.classList.add('d-none');

    }));

}

area.onclick = async function () {

    loading.classList.remove('d-none');
 let aryData = await conunts();
 let are = "";

    for (let i = 0; i < aryData.length; i++) {

        are += `
        
            <div class="col-lg-3 col-md-4">

            <div class="rounded-2 text-center cursor-pointer arey" id='${aryData[i].strArea}'>

                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${aryData[i].strArea}</h3>

            </div>

        </div>
        
        
        `

    }

    meals.innerHTML = are;

    loading.classList.add('d-none');
    document.querySelectorAll('.arey').forEach(e => e.addEventListener('click', async function () {

        loading.classList.remove('d-none');
        let areaName = this.getAttribute('id');
        console.log(areaName);
        await contryAare(areaName);
        aeaydisplay(meals);
        loading.classList.add('d-none');
    }));

};

ingredients.onclick = async function () {

    loading.classList.remove('d-none');
    let ingreAll = await ingredientsAll();

    let ingr = "";

    for (let i = 0; i < 20; i++) {

        ingr += `
        
        <div class="col-lg-3 col-md-4">
    
        <div class="rounded-2 text-center cursor-pointer ingr" id ="${ingreAll[i].strIngredient}">

            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${ingreAll[i].strIngredient}</h3>
                <p class = "inferper">${ingreAll[i].strDescription}</p>

            </div>

        </div>

        `

    }

    meals.innerHTML = ingr;

    loading.classList.add('d-none');
    document.querySelectorAll('.ingr').forEach(e => e.addEventListener('click', async function () {

        loading.classList.remove('d-none');
        let cat = this.getAttribute('id');
        console.log(cat , "test");
        await ingredientsName(cat);
        ingredientsNamedisplay(meals);

        loading.classList.add('d-none');
    }));

}






var contact = document.getElementById('contact');


contact.onclick =  function showContacts() {
    meals.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput"  type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput"  type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput"  type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput"  type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput"  type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput"  type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    let submitBtn = document.getElementById("submitBtn")
    console.log(submitBtn)

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })



let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




document.querySelectorAll("input").forEach(e => e.onclick = function inputsValidation() {
    console.log(document.getElementById("nameAlert"))

    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
})
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
}






















