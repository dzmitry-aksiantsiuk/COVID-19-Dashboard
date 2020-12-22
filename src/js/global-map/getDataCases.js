import { cases } from './config';

const getDataCases = (worldData) => {
  const arr = cases;
  worldData.forEach((country) => {
    // cases.push({ id: country.CountryCode, totalConfirmed: country.TotalConfirmed });
    arr.push(
      {
        id: country.CountryCode,
        totalConfirmed: country.TotalConfirmed || 1,
        totalRecovered: country.TotalRecovered || 1,
        totalDeaths: country.TotalDeaths || 1,
      },
    );
  });
  cases = arr;
};

export default getDataCases;
