let countries;
const TotalTable = {};

async function getCovidStats() {
  const url = 'https://api.covid19api.com/summary';
  const respons = await fetch(url);
  const data = await respons.json();
  TotalTable.TotalConfirmed = data.Global.TotalConfirmed;
  TotalTable.TotalDeaths = data.Global.TotalDeaths;
  TotalTable.TotalRecovered = data.Global.TotalRecovered;
  console.log(TotalTable);
  console.log(data);
  console.log(data.Countries.find((i) => i.Country.toLowerCase() === 'ukraine'));
  console.log(countries.find((i) => (i.name).toLowerCase() === 'ukraine'));
}

const fetchCountries = async () => {
  countries = await fetch('https://restcountries.eu/rest/v2/all?fields=name;population;flag').then(res => res.json());
};

fetchCountries();
getCovidStats();
