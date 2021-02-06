const inputButton = document.getElementById("input-button");

inputButton.addEventListener("click", () => {
  const inputMealName = document.getElementById("input-name").value;
  fetchingMealData(inputMealName);
});

const fetchingMealData = (inputNameValue) => {
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputNameValue}`
  )
    .then((response) => response.json())
    .then((data) => showMeal(data.meals));

  const showMeal = (meals) => {
    meals.forEach((meal) => {
      const mealName = meal.strMeal;
      const mealThumbnail = meal.strMealThumb;

      const mealBox = document.getElementById("my-container");
      const mealBoxDetails = document.createElement("div");
      mealBoxDetails.className = "meal-box";

      const showInDom = `
            <img class="meal-img" src="${mealThumbnail}">
            <h4 class="meal-heading">${mealName}</h4>
        `;

      mealBoxDetails.innerHTML = showInDom;
      mealBox.appendChild(mealBoxDetails);
    });
  };
};
