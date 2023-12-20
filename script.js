function searchCountry(event) {
  event.preventDefault(); // Prevents the default form submission

  var inputElement = document.getElementById("searchInput");
  var countryInfoElement = document.getElementById("countryInfo");

  // Get the value entered by the user
  var countryName = inputElement.value;

  // Fetch data from the API
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => response.json())
    .then((data) => {
      // Check if the data is available
      if (data.length > 0) {
        // Display country information
        var country = data[0];
        var flagUrl = getFlagUrl(country.flags);

        var countryInfo = `
          <div style="text-align: center;">
            <h2 style="font-size: 24px; color: #007bff;">${
              country.name.common
            }</h2>
          </div>
          <div style="display: flex;">
            <div style="flex: 1;">
              <img src="${flagUrl}" alt="${
          country.name.common
        } Flag" style="width: 100%; max-width: 200px; max-height: 120px;">
            </div>
            <div style="flex: 1; padding-left: 10px; display: flex; flex-wrap: wrap; justify-content: space-between;">
              <div class="country-data">Capital: ${country.capital}</div>
              <div class="country-data">Region: ${country.region}</div>
              <div class="country-data">Population: ${country.population}</div>
              <div class="country-data">Area: ${country.area} km²</div>
              <div class="country-data">Continent: ${getFirstValue(
                country.continents
              )}</div>
              <div class="country-data">Languages: ${getLanguages(
                country.languages
              )}</div>
            </div>
          </div>
        `;
        countryInfoElement.innerHTML = countryInfo;

        // Show the container
        countryInfoElement.style.display = "block";
      } else {
        // Display an error message if the country is not found
        countryInfoElement.innerHTML = "<p>Country not found</p>";

        // Hide the container
        countryInfoElement.style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      countryInfoElement.innerHTML = "<p>Error fetching data</p>";

      // Hide the container
      countryInfoElement.style.display = "none";
    });
}

// Helper function to get the first value of an object
function getFirstValue(obj) {
  return obj ? Object.values(obj)[0] : "";
}

// Helper function to format languages
function getLanguages(languages) {
  return languages ? Object.values(languages).join(", ") : "";
}

// Helper function to get the flag URL
function getFlagUrl(flags) {
  return flags ? flags.svg : "";
}
