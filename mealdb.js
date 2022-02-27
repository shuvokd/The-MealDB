document.getElementById('error-message').style.display = 'none';

const searchFood =  () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    //Clear Data
    searchField.value = '';

    document.getElementById('error-message').style.display = 'none';

    if(searchText == ''){
        console.log("Please Write Something to Display!")
    }
    else{
        //load Data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    console.log(url);

        // try{
        //     const res = await fetch(url);
        //     const data = await res.json();
        //     displaySearchResult(data.meals)
        // }
        // catch (error){
        //     console.log(error)
        // }



    fetch(url)
    .then(res =>res.json())
    .then(data => displaySearchResult(data.meals))
    .catch(error => dispplayError(error));
    }

}
const dispplayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = meals =>{
    const searchResult =document.getElementById('search-result');

    //Empty Search Result
    searchResult.textContent = '';
    if(meals.length == 0){
        console.log("Your Item is not avaliable!")
    }
    

    meals.forEach(meal =>{
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0,250)}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);


    })
}
const loadMealDetail = async mealID => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;

    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0]);

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealDetail(data.meals[0]));
}
const displayMealDetail = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div =document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Know More</a>
        </div>
    `;
    mealDetails.appendChild(div);
}
