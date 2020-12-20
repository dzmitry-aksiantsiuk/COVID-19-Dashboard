import { numberWithCommas } from './countriesList';

function createTitle() {
  return `
    <th>Confirmed</th>
    <th>Deaths</th>
    <th>Recovered</th>
  `;
}

class BuildTable {
  constructor(data, totalPopulation) {
    this.global = data.Global;
    this.countryStats = data.Countries;
    this.countries = totalPopulation;
    this.worldPopulation = this.countries.map((country) => country.population)
      .reduce((acc, val) => acc + val); //  7800000000
  }

  render() {
    const wrraper = document.createElement('div');
    this.el = document.createElement('table');
    this.root = document.querySelector('.root');
    wrraper.classList.add('tableWrraper');
    this.el.classList.add('table');
    this.el.innerHTML = /* html */`
    <thead>
      <tr>
        <th class="title" colspan="3">World</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th colspan="3">Total Cases</th>
      </tr>
      <tr>
        ${createTitle()}
      </tr>
      <tr>
        <td class="total">${numberWithCommas(this.global.TotalConfirmed)}</td>
        <td class="total">${numberWithCommas(this.global.TotalDeaths)}</td>
        <td class="total">${numberWithCommas(this.global.TotalRecovered)}</td>
      </tr>
      <tr>
        <th class="hide" colspan="3">For the last day</th>
      </tr>
      <tr class="hide">
        ${createTitle()}
      </tr>
      <tr>
        <td class="last__day hide">${numberWithCommas(this.global.NewConfirmed)}</td>
        <td class="last__day hide">${numberWithCommas(this.global.NewDeaths)}</td>
        <td class="last__day hide">${numberWithCommas(this.global.NewRecovered)}</td>
      </tr>
      <tr>
        <th class="hide" colspan="3">per 100k</th>
      </tr>
      <tr class="hide">
        ${createTitle(this.global.TotalConfirmed, this.worldPopulation)}
      </tr>
      <tr>
        <td class="per100 hide">${numberWithCommas(this.global.TotalConfirmed, this.worldPopulation)}</td>
        <td class="per100 hide">${numberWithCommas(this.global.TotalDeaths, this.worldPopulation)}</td>
        <td class="per100 hide">${numberWithCommas(this.global.TotalRecovered, this.worldPopulation)}</td>
      </tr>
      <tr class="hide">
        <th colspan="3">per 100k last day</th>
      </tr>
      <tr class="hide">
        ${createTitle()}
      </tr>
      <tr>
      <td class="per100__last-day hide">
        ${numberWithCommas(this.global.NewConfirmed, this.worldPopulation)}</td>
      <td class="per100__last-day hide">
        ${numberWithCommas(this.global.NewDeaths, this.worldPopulation)}</td>
      <td class="per100__last-day hide">
        ${numberWithCommas(this.global.NewRecovered, this.worldPopulation)}</td>
      </tr>
    </tbody>
      </tbody>`;

    wrraper.append(this.el);
    document.body.prepend(wrraper);
  }

  updateData(dataCountryStats, dataCountriesPopul) {
    this.title = document.querySelector('.title');
    this.totalCases = document.querySelectorAll('.total');
    this.lastDay = document.querySelectorAll('.last__day');
    this.per100 = document.querySelectorAll('.per100');
    this.per100LastDay = document.querySelectorAll('.per100__last-day');
    const [...totalStats] = [
      dataCountryStats.TotalConfirmed, dataCountryStats.TotalDeaths, dataCountryStats.TotalRecovered,
    ];
    const [...lastDayData] = [
      dataCountryStats.NewConfirmed, dataCountryStats.NewDeaths, dataCountryStats.NewRecovered,
    ];
    this.title.textContent = dataCountryStats.Country;

    this.totalCases.forEach((item, i) => {
      const total = item;
      total.textContent = numberWithCommas(totalStats[i]);
    });

    this.lastDay.forEach((item, i) => {
      const stats = item;
      stats.textContent = numberWithCommas(lastDayData[i]);
    });

    this.per100.forEach((item, i) => {
      const stats = item;
      stats.textContent = numberWithCommas(totalStats[i], dataCountriesPopul.population);
    });

    this.per100LastDay.forEach((item, i) => {
      const stats = item;
      stats.textContent = numberWithCommas(lastDayData[i], dataCountriesPopul.population);
    });
  }
}

export { BuildTable };
