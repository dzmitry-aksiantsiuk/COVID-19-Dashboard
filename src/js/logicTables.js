import { featchCovidStats, fetchCountries } from './fetchCovidStatsAndPopulation';
import { BuildTable } from './renderTable';
import { ContriesList } from './countriesList';

function calcFor100k(dividend, divisor) {
  return Math.round((dividend / divisor) * 100000);
}

function joinApiData(stats, countries) {
  const countryMap = {
    Bolivia: 'Bolivia (Plurinational State of)',
    'Cape Verde': 'Cabo Verde',
    'Congo (Brazzaville)': 'Congo',
    'Congo (Kinshasa)': 'Congo (Democratic Republic of the)',
    'Holy See (Vatican City State)': 'Holy See',
    'Iran, Islamic Republic of': 'Iran (Islamic Republic of)',
    'Korea (South)': 'Korea (Democratic People\'s Republic of)',
    'Lao PDR': 'Lao People\'s Democratic Republic',
    'Macao, SAR China': 'Macao',
    'Macedonia, Republic of': 'Macedonia (the former Yugoslav Republic of)',
    Moldova: 'Moldova (Republic of)',
    'Palestinian Territory': 'Palestine, State of',
    'Saint Vincent and Grenadines': 'Saint Vincent and the Grenadines',
    'Syrian Arab Republic (Syria)': 'Syrian Arab Republic',
    'Taiwan, Republic of China': 'Taiwan',
    'United Kingdom': 'United Kingdom of Great Britain and Northern Ireland',
    'Venezuela (Bolivarian Republic)': 'Venezuela (Bolivarian Republic of)',
  };

  const worldPopulation = 78e8;

  const data = {
    global: {
      country: 'World',
      newConfirmed: stats.Global.NewConfirmed,
      newDeaths: stats.Global.NewDeaths,
      newRecovered: stats.Global.NewRecovered,
      totalConfirmed: stats.Global.TotalConfirmed,
      totalDeaths: stats.Global.TotalDeaths,
      totalRecovered: stats.Global.TotalRecovered,
      flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Earth.svg',
      population: worldPopulation,
      newConfirmed100k: calcFor100k(stats.Global.NewConfirmed, worldPopulation),
      newDeaths100k: calcFor100k(stats.Global.NewDeaths, worldPopulation),
      newRecovered100k: calcFor100k(stats.Global.NewRecovered, worldPopulation),
      totalConfirmed100k: calcFor100k(stats.Global.TotalConfirmed, worldPopulation),
      totalDeaths100k: calcFor100k(stats.Global.TotalDeaths, worldPopulation),
      totalRecovered100k: calcFor100k(stats.Global.TotalRecovered, worldPopulation),
    },
    countries: stats.Countries.map(({
      Country, NewConfirmed, NewDeaths, NewRecovered, TotalConfirmed, TotalDeaths, TotalRecovered,
    }) => {
      const { flag, population } = countries.find((country) => country.name === (countryMap[Country] || Country));
      return {
        country: Country,
        newConfirmed: NewConfirmed,
        newDeaths: NewDeaths,
        newRecovered: NewRecovered,
        totalConfirmed: TotalConfirmed,
        totalDeaths: TotalDeaths,
        totalRecovered: TotalRecovered,
        flag,
        population,
        newConfirmed100k: calcFor100k(NewConfirmed, population),
        newDeaths100k: calcFor100k(NewDeaths, population),
        newRecovered100k: calcFor100k(NewRecovered, population),
        totalConfirmed100k: calcFor100k(TotalConfirmed, population),
        totalDeaths100k: calcFor100k(TotalDeaths, population),
        totalRecovered100k: calcFor100k(TotalRecovered, population),
      };
    }),
  };

  return data;
}

async function tables() {
  const [stats, countries] = [...await Promise.all([featchCovidStats(), fetchCountries()])];
  const data = joinApiData(stats, countries);
  console.log(data);
  const dataTable = new BuildTable(stats, countries);
  const countriesTable = new ContriesList(countries);
  dataTable.render();
  countriesTable.render();

  const getNameCountries = (item) => {
    const element = item.target.closest('.country').children[1] || item.target.children[1];
    return element.textContent;
  };

  const updateStyleElement = (element) => {
    const li = element.target.closest('.country');
    document.querySelectorAll('.country').forEach((item) => item.classList.remove('active'));
    li.classList.add('active');
  };

  const updateTableStats = (element) => {
    updateStyleElement(element);
    const dataCountryStats = stats.Countries.find((i) => i.Country === getNameCountries(element));
    const dataCountriesPopul = countries.find((i) => i.name === getNameCountries(element));
    dataTable.updateData(dataCountryStats, dataCountriesPopul);
  };

  const countriesList = document.querySelector('.countries__list');

  countriesList.addEventListener('click', updateTableStats);
}

export { tables };
