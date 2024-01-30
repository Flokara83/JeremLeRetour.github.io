const countriesContainer = document.querySelector(".countries-container");
const inputSearch = document.querySelector("#inputSearch")
const rangeValue = document.querySelector('#rangeValue')
const inputRange = document.querySelector('#inputRange')

const minToMax = document.querySelector('#minToMax')
const maxToMin = document.querySelector("#maxToMin");
const alpha = document.querySelector('#alpha')

const btnSort = document.querySelectorAll('.btnSort')

// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)

//ok

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.

let countriesData = "";
let sortMethod ="";



async function fetchCountry() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countriesData = data));
  console.log(countriesData);

  countriesDisplay();
}




function countriesDisplay() {
  countriesContainer.innerHTML = countriesData

  .filter((country) => country.translations.fra.common
    .toLowerCase()
    .includes(inputSearch.value.toLowerCase()) 
    )

    .sort((a,b) => {
        if (sortMethod === "minToMax") {
            return  a.population - b.population
        }else if(sortMethod === "maxToMin"){
            return b.population - a.population; 
        }else if (sortMethod === "alpha"){
            return (
                a.translations.fra.common.localeCompare(b.translations.fra.common)
            )
        }
    })
    .slice(0, inputRange.value)
  
  .map(
    (country) =>
      `
        <div class="card">
            <img src="${country.flags.svg}" alt="${country.translations.fra.common}">
            <h2>${country.translations.fra.common}</h2>
            <h4>${country.capital}</h4>
            <p>Population : ${country.population.toLocaleString()}</p>
        </div>
   `
  ).join("");
}


window.addEventListener("load",fetchCountry);
inputSearch.addEventListener("input",countriesDisplay )
inputRange.addEventListener("input", () => {
    countriesDisplay ()
rangeValue.textContent = inputRange.value
   } )


btnSort.forEach(btn => {
    btn.addEventListener("click", (e) => {
        console.log(e.target.id);
       sortMethod = e.target.id;
        countriesDisplay()
    })
});
// 3 - Passer les données à une variable

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// coutry.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
