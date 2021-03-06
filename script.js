//////////// SEARCH BUTTON EVENT HANDLER ////////////

const inputButton = document.getElementById("input-button");

inputButton.addEventListener("click", () => {
  const mealBoxDetails = document.getElementsByClassName("meal-box");

  // hiding previous meal-box divs(IF ANY) for new search
  if (mealBoxDetails.length > 0) {
    for (let i = 0; i < mealBoxDetails.length; i++) {
      const div = mealBoxDetails[i];
      div.style.display = "none";
    }
  }

  const inputMealName = document.getElementById("input-name").value;
  fetchingMealData(inputMealName);
});

//////////// FETCHING FUNCTION FOR SEARCH ///////////

const fetchingMealData = (inputNameValue) => {
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputNameValue}`
  )
    .then((response) => response.json())
    .then((data) => showMeal(data.meals))
    .catch(() => ifError());
};

///////////// SETTING FETCHED DETAILS FOR MEAL-BOXES - FUNCTION /////////////

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

  showPopup();
};

////////////////// ADDING EVENT HANDLER FOR POPUP //////////////////

const showPopup = () => {
  const classMealBox = document.getElementsByClassName("meal-box");

  for (let i = 0; i < classMealBox.length; i++) {
    const mealBox = classMealBox[i];

    mealBox.addEventListener("click", function () {
      // had to use function instead of arrow because 'this' doesn't work in arrow
      const popupId = document.getElementById("popup-box");
      popupId.style.transform = "translate(-50%, -50%) scale(.92)";

      const mealName = this.getElementsByClassName("meal-heading")[0].innerHTML;

      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then((response) => response.json())
        .then((data) => popupDetailsSetting(data));
    });
  }
};

////////////////// POPUP DETAILS SETTING & EXECUTION FUNCTION /////////////////

const popupDetailsSetting = (info) => {
  console.log(info.meals[0]);
  const popupId = document.getElementById("popup-box");

  //// POPUP IMAGE DOM SETTING
  const mealImage = info.meals[0].strMealThumb;
  const popupImageDiv = document.createElement("div");

  const popupImageDom = `<img class="popup-img" src="${mealImage}">`;

  popupImageDiv.innerHTML = popupImageDom;
  popupId.appendChild(popupImageDiv);

  //// POPUP TEXT DETAILS DOM SETTINGS
  const mealName = info.meals[0].strMeal;
  const popupDetailsDiv = document.createElement("div");
  popupDetailsDiv.className = "popup-details";

  const popupDetailsDom = `
      <h2>${mealName}</h2>
      <h4>Ingredients</h4>
   
      <button class="my-btn btn btn-dark">&times;</button>`;

  popupDetailsDiv.innerHTML = popupDetailsDom;
  popupId.appendChild(popupDetailsDiv);

  ///// SHOWING INGREDIENTS IN DOM
  const getMeal = info.meals[0];
  const mealList = document.createElement("ul");
  popupDetailsDiv.appendChild(mealList);

  for (let i = 1; i <= 10; i++) {
    const mealIngredient = getMeal[`strIngredient${i}`];

    if (mealIngredient !== "") {
      const mealItem = document.createElement("li");
      mealItem.innerHTML = "&diams; " + mealIngredient;
      mealList.appendChild(mealItem);
    }
  }

  //// EVENT HANDLING FOR POPUP CLOSE BUTTON
  const closePopupButton = document.getElementsByClassName("my-btn");

  for (let i = 0; i < closePopupButton.length; i++) {
    const button = closePopupButton[i];

    button.addEventListener("click", () => {
      popupId.style.transform = "translate(-50%, -50%) scale(0)";
      popupImageDiv.style.display = "none";
      popupDetailsDiv.style.display = "none";
    });
  }
};

//////////////// ERROR HANDLING FUNCTION /////////////////

const ifError = () => {
  const getErrorClass = document.querySelector(".error-box");
  getErrorClass.style.transform = "translate(-50%, -50%) scale(1)";

  const errorCloseButton = document.querySelector(".my-close-btn");
  errorCloseButton.addEventListener("click", () => {
    getErrorClass.style.transform = "translate(-50%, -50%) scale(0)";
  });
};
