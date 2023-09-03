(function () {
  fetchApi();
})();
$(document).ready(function () {
  $(".loading-layer").fadeOut(400, function () {
    $("body").css("overflow", "visible");
  });
});

let navItemsWidth = "-" + $("nav .nav-items section").outerWidth() + "px";
document.querySelector("nav").style.left = navItemsWidth;
$(".nav-open").click(function () {
  console.log(navItemsWidth);
  $("nav").animate({ left: 0 }, 500);
  $(".nav-open").toggleClass("d-none");
  $(".nav-close").toggleClass("d-none");
});
$(".nav-close").click(function () {
  console.log(navItemsWidth);
  $("nav").animate({ left: navItemsWidth }, 500);
  $(".nav-open").toggleClass("d-none");
  $(".nav-close").toggleClass("d-none");
});

let meals = [];
let category = [];
let AreaContainer = [];
let ingradiantsContainer = [];
async function fetchApi(search = "") {
  let apifetching = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
  );
  let response = await apifetching.json();
  meals = response.meals;
  console.log(meals);
  if (meals == null) {
    meals = [];
  }
  displayFood();
}
async function fetchApiForSerchFS(search = "") {
  let apifetching = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`
  );
  let response = await apifetching.json();
  meals = response.meals;
  if (meals == null) {
    meals = [];
  }
  displayFood();
}
async function fetchApiForCategory() {
  let apifetching = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let response = await apifetching.json();
  category = response.categories;
  console.log(category);
  displayCategories();
}
async function filterByCategory(search) {
  let apifetching = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`
  );
  let response = await apifetching.json();
  meals = response.meals;
  console.log(meals);
  if (meals == null) {
    meals = [];
  }
  displayFood();
}
async function filterByid(search) {
  let apifetching = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${search}`
  );
  let response = await apifetching.json();
  meals = response.meals;
  console.log(meals);
  if (meals == null) {
    meals = [];
  }
  displayInstruction(0);
  makeIngrdiant(0);
}
async function fetchAreaApi() {
  let apifetching = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let response = await apifetching.json();
  AreaContainer = response.meals;
  displayArea();
  console.log(AreaContainer);
}
async function fetchingrediantsApi() {
  let apifetching = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let response = await apifetching.json();
  ingradiantsContainer = response.meals;
  console.log(ingradiantsContainer);
  displayingrdiants();
}
async function fetchFilterByAreaApi(search) {
  let apifetching = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${search}`
  );
  let response = await apifetching.json();
  meals = response.meals;
  console.log(meals);
  displayFood();
}
async function fetchFilterByingrediantApi(search) {
  let apifetching = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`
  );
  let response = await apifetching.json();
  meals = response.meals;
  console.log(meals);
  displayFood();
}

let mealsContainer = document.getElementById("meals");
let foodCategory;
function displayFood() {
  main.classList.remove("d-none");
  let cartona = "";

  for (let i = 0; i < meals.length; i++) {
    cartona += `<div class="col-md-3">
            <section>
                <figure class="food-category-style food-category position-relative" id='${i}'>
                    <img src="${meals[i].strMealThumb}" class="w-100" alt="food">
                  <div class="layer fs-3">${meals[i].strMeal}</div>
                </figure>
            </section>
        </div>`;
  }
  mealsContainer.innerHTML = cartona;
  foodCategory = document.querySelectorAll(".food-category");
  addEvents();
}

function displayFood() {
  main.classList.remove("d-none");
  let cartona = "";

  for (let i = 0; i < meals.length; i++) {
    cartona += `<div class="col-md-3">
            <section>
                <figure class="food-category-style food-category position-relative" id='${meals[i].idMeal}'>
                    <img src="${meals[i].strMealThumb}" class="w-100" alt="food">
                    <div class="layer fs-3">${meals[i].strMeal}</div>
                </figure>
            </section>
        </div>`;
  }
  mealsContainer.innerHTML = cartona;
  foodCategory = document.querySelectorAll(".food-category");
  addEventsAfterChooseCategory();
}

let food_type = document.getElementById("Category");
function displayCategories() {
  let cartona = "";
  for (let i = 0; i < category.length; i++) {
    cartona += `<div class="col-md-4">
    <section>
        <figure class="food-category-style type position-relative" id='${category[i].strCategory}'>
            <img src="${category[i].strCategoryThumb}" class="w-100" alt="food">
            <div class="layer d-block text-center p-2">
                <p class="fw-bolder fs-3 mb-0">${category[i].strCategory}</p>
                <p>${category[i].strCategoryDescription}</p>
            </div>
        </figure>
    </section>
</div>`;
  }
  food_type.innerHTML = cartona;
  types = document.querySelectorAll(".type");
  insertEvents();
}
let countryContainer;
function displayArea() {
  cartona = "";
  for (let i = 0; i < AreaContainer.length; i++) {
    cartona += `<div class="col-md-3">
       <section class = 'country' id ='${AreaContainer[i].strArea}'>
           <i class="fa-solid fa-house-laptop fa-4x"></i>
           <h3>${AreaContainer[i].strArea}</h3>
       </section>
   </div>`;
  }
  document.getElementById("Area").innerHTML = cartona;
  countryContainer = document.querySelectorAll(".country");
  addAreaEvent();
}
function addAreaEvent() {
  for (const ele of countryContainer) {
    ele.addEventListener("click", function () {
      let areaid = this.getAttribute("id");
      fetchFilterByAreaApi(areaid);
      food_area.classList.add("d-none");
    });
  }
}
function addingrediantsEvent() {
  for (const ele of itemsContainer) {
    ele.addEventListener("click", function () {
      let ingradiantid = this.getAttribute("id");
      fetchFilterByingrediantApi(ingradiantid);
      food_ingrediants.classList.add("d-none");
    });
  }
}

let itemsContainer;
function displayingrdiants() {
  cartona = "";
  for (let i = 0; i < 24; i++) {
    cartona += ` <div class="col-md-3">
                    <section  class = 'food-items ' id ='${ingradiantsContainer[i].strIngredient}'>
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h5 class = 'my-3'>${ingradiantsContainer[i].strIngredient}</h5>
                    <p style="height: 150px;" class = 'overflow-hidden'>${ingradiantsContainer[i].strDescription}</p>
                    </section>
                    </div>`;
  }
  document.getElementById("ingrediants").innerHTML = cartona;
  itemsContainer = document.querySelectorAll(".food-items");
  addingrediantsEvent();
}

let Insruction = document.getElementById("instruc-text");

let main = document.querySelector("main");
let foodInstruction = document.querySelector(".food-instruction");
let searchInputs = document.querySelector(".searchInputs");
let FoodType = document.getElementById("Food-type");
let food_area = document.getElementById("Food-Area");
let food_ingrediants = document.getElementById("Food-ingrediants");
let contactUs = document.getElementById("contact-us");

function addEventsAfterChooseCategory() {
  for (const ele of foodCategory) {
    ele.addEventListener("click", function () {
      let idmeal = this.getAttribute("id");
      filterByid(idmeal);
      main.classList.add("d-none");
      foodInstruction.classList.remove("d-none");
      searchInputs.classList.add("d-none");
    });
  }
}
function addEvents() {
  for (const ele of foodCategory) {
    ele.addEventListener("click", function () {
      let index = this.getAttribute("id");
      displayInstruction(index);
      makeIngrdiant(index);
      main.classList.add("d-none");
      foodInstruction.classList.remove("d-none");
      searchInputs.classList.add("d-none");
    });
  }
}
function insertEvents() {
  for (const ele of types) {
    ele.addEventListener("click", function () {
      let cat = this.getAttribute("id");
      filterByCategory(cat);
      FoodType.classList.add("d-none");
    });
  }
}

let ingradiant = [];
function makeIngrdiant(index) {
  for (let i = 1; i <= 20; i++) {
    let numIngradiant =
      meals[index][`strMeasure${i}`] + meals[index][`strIngredient${i}`];
    if (numIngradiant != " " && numIngradiant != "") {
      ingradiant.push(numIngradiant);
    }
  }
  cartona = "";
  for (i = 0; i < ingradiant.length; i++) {
    cartona += `<div><div class="inner">${ingradiant[i]}</div></div>`;
  }
  recipes.innerHTML = cartona;
}
let instruction_img = document.querySelector(".instruction-img");
let mealName = document.getElementById("mealName");
let area = document.getElementById("area");
let strCategory = document.getElementById("strCategory");
let youtupe = document.getElementById("Youtupe");
let source = document.getElementById("Source");
let recipes = document.querySelector(".recipes");
let tag = document.querySelector(".tag-type");

function displayInstruction(index) {
  Insruction.innerHTML = meals[index].strInstructions;
  instruction_img.innerHTML = `<img class="w-100" src="${meals[index].strMealThumb}">`;
  mealName.innerHTML = `<p>${meals[index].strMeal}</p>`;
  area.innerHTML = meals[index].strArea;
  strCategory.innerHTML = meals[index].strCategory;
  if (meals[index].strTags != null) {
    tag.innerHTML = `<span style="padding: 10px;">${meals[index].strTags}</span>`;
  }
  youtupe.href = `${meals[index].strYoutube}`;
  source.href = `${meals[index].strSource}`;
}

document.getElementById("searchByName").addEventListener("keyup", function () {
  fetchApi(this.value);
});
let letter = "";
document.getElementById("searchByFL").addEventListener("keyup", function () {
  letter = this.value;
  if (letter == "") {
    letter = "a";
  }
  fetchApiForSerchFS(letter);
});

document.getElementById("searchbtn").addEventListener("click", function () {
  main.classList.add("d-none");
  searchInputs.classList.remove("d-none");
  foodInstruction.classList.add("d-none");
  FoodType.classList.add("d-none");
  contactUs.classList.add("d-none");
  food_area.classList.add("d-none");
  food_ingrediants.classList.add("d-none");
});
document
  .getElementById("Categorybtn")
  .addEventListener("click", async function () {
    await fetchApiForCategory();
    main.classList.add("d-none");
    searchInputs.classList.add("d-none");
    foodInstruction.classList.add("d-none");
    FoodType.classList.remove("d-none");
    contactUs.classList.add("d-none");
    food_area.classList.add("d-none");
    food_ingrediants.classList.add("d-none");
  });
document.getElementById("areabtn").addEventListener("click", async function () {
  await fetchAreaApi();
  main.classList.add("d-none");
  searchInputs.classList.add("d-none");
  foodInstruction.classList.add("d-none");
  FoodType.classList.add("d-none");
  contactUs.classList.add("d-none");
  food_area.classList.remove("d-none");
  food_ingrediants.classList.add("d-none");
});
document
  .getElementById("ingrediantsbtn")
  .addEventListener("click", async function () {
    await fetchingrediantsApi();
    main.classList.add("d-none");
    searchInputs.classList.add("d-none");
    foodInstruction.classList.add("d-none");
    FoodType.classList.add("d-none");
    food_area.classList.add("d-none");
    contactUs.classList.add("d-none");
    food_ingrediants.classList.remove("d-none");
  });
document
  .getElementById("contactbtn")
  .addEventListener("click", async function () {
    await fetchingrediantsApi();
    main.classList.add("d-none");
    searchInputs.classList.add("d-none");
    foodInstruction.classList.add("d-none");
    FoodType.classList.add("d-none");
    food_area.classList.add("d-none");
    food_ingrediants.classList.add("d-none");
    contactUs.classList.remove("d-none");
  });
