function searchCountry(event) {
  event.preventDefault();

  var inputElement = document.getElementById("searchInput");
  var countryInfoElement = document.getElementById("countryInfo");

  var countryName = inputElement.value;

  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
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
        countryInfoElement.innerHTML = "<p>Country not found</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      countryInfoElement.innerHTML = "<p>Error fetching data</p>";
    });
}
