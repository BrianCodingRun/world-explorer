// GET ELEMENTS DOM

// Inputs
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const sortNameAsc = document.getElementById("sortNameAsc");
const sortNameDesc = document.getElementById("sortNameDesc");
const sortPopAsc = document.getElementById("sortPopAsc");
const sortPopDesc = document.getElementById("sortPopDesc");
const countryCount = document.getElementById("countryCount");
const countValue = document.getElementById("countValue");

// Main Container
const countriesContainer = document.getElementById("countriesContainer");

// Init array countries
let countries = [];

// Filter & Sort
let sortMethod = "sortNameAsc";
let selectValue = "";

// Fetch Data Countries
const fetchCountries = async () => {
  try {
    const request = await fetch("https://restcountries.com/v3.1/all");
    countries = await request.json();
    console.log(countries);
    updateMain();
  } catch (error) {
    console.log(error);
  }
};

fetchCountries();

const updateMain = () => {
  countriesContainer.innerHTML = "";
  let countriesCopy = [...countries];

  // Filter search result
  let resultNumber = countryCount.value;
  if (resultNumber) {
    countriesCopy = countriesCopy.slice(0, resultNumber);
  }

  // Filter search result
  let val = searchInput.value;
  if (val) {
    countriesCopy = countriesCopy.filter((country) =>
      country.translations.fra.official
        .toLowerCase()
        .includes(val.toLowerCase())
    );
  }

  if (selectValue) {
    countriesCopy = countriesCopy.filter((country) =>
      country.region.toLowerCase().includes(selectValue.toLowerCase())
    );
  }
  countriesCopy
    .sort((a, b) => {
      if (sortMethod === "sortNameAsc") {
        return a.translations.fra.official.localeCompare(
          b.translations.fra.official
        );
      } else if (sortMethod === "sortNameDesc") {
        return b.translations.fra.official.localeCompare(
          a.translations.fra.official
        );
      } else if (sortMethod === "sortPopAsc") {
        return b.population - a.population;
      } else if (sortMethod === "sortPopDesc") {
        return a.population - b.population;
      }
    })
    .forEach((country) => {
      countriesContainer.innerHTML += `
      <div class="country-card">
          <div class="flag-container">
              <img src=${country.flags.png} alt=${country.translations.fra.official} />
          </div>
          <div class="country-info">
              <h2>${country.translations.fra.official}</h2>
              <p><strong>Capitale:</strong> ${country.capital}</p>
              <p><strong>Population:</strong> ${country.population}</p>
              <p><strong>Région:</strong> ${country.region}</p>
          </div>
      </div>
    `;
    });
};

countryCount.addEventListener("input", (e) => {
  countValue.innerText = e.target.value;
  updateMain();
});

searchInput.addEventListener("input", () => {
  updateMain();
});

sortNameAsc.addEventListener("click", () => {
  sortMethod = sortNameAsc.id;
  updateMain();
});

sortNameDesc.addEventListener("click", () => {
  sortMethod = sortNameDesc.id;
  updateMain();
});

sortPopAsc.addEventListener("click", () => {
  sortMethod = sortPopAsc.id;
  updateMain();
});

sortPopDesc.addEventListener("click", () => {
  sortMethod = sortPopDesc.id;
  updateMain();
});

regionFilter.addEventListener("change", (e) => {
  selectValue = e.target.value;
  updateMain();
});
