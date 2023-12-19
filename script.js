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
        var countryInfo = `
            <h2>${country.name.common}</h2>
            <p>Capital: ${country.capital}</p>
            <p>Region: ${country.region}</p>
            <p>Population: ${country.population}</p>
            <p>Area: ${country.area} km²</p>
          `;
        countryInfoElement.innerHTML = countryInfo;
      } else {
        // Display an error message if the country is not found
        countryInfoElement.innerHTML = "<p>Country not found</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      countryInfoElement.innerHTML = "<p>Error fetching data</p>";
    });
}
