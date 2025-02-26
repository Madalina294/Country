const SearchBtn = document.querySelector("#search-btn");
const countryInput = document.querySelector("#country-inp");

SearchBtn.addEventListener("click", () => {
  const result = document.querySelector("#result");
  result.innerHTML = "";

  let countryName = countryInput.value.trim();
  let apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  //console.log(apiUrl.toString());
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const result = document.querySelector("#result");

      const flagImg = document.createElement("img");
      flagImg.classList.add("flagImg");
      flagImg.src = data[0].flags.svg;
      result.append(flagImg);

      const title = document.createElement("h2");
      title.innerText = data[0].name.common;
      result.append(title);

      const details = document.createElement("ul");
      details.classList.add("detailsList");
      result.append(details);

      //details.style.backgroundImage = `url(${data[0].flags.svg})`;

      const capital = document.createElement("li");
      capital.innerText = `Capital: ${data[0].capital}`;
      details.append(capital);

      const continent = document.createElement("li");
      continent.innerText = `Continent: ${data[0].continents}`;
      details.append(continent);

      const currency = document.createElement("li");
      currency.innerText = `Currency: ${Object.keys(data[0].currencies)[0]}`;
      details.append(currency);

      const languages = document.createElement("li");
      languages.innerText = `Languages: ${Object.values(data[0].languages)
        .toString()
        .split(",")
        .join(", ")}`;
      details.append(languages);
    })
    .catch(() => {
      if (countryName.length === 0) {
        result.innerHTML = "Please enter the name of the contry!";
        return;
      } else {
        result.innerHTML = "Please enter a valid name of a contry!";
      }
    });
  countryInput.value = "";
});
