import { numberWithCommas } from './countryList';

function createTitle() {
  return `
    <th>Confirmed</th>
    <th>Deaths</th>
    <th>Recovered</th>
  `;
}

class BuildTable {
  constructor(country) {
    this.country = country;
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
          <th colspan="3"><img class="table__img" src="${this.country.flag}"> <span class="title">World</span></th>
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
          <td class="total">${numberWithCommas(this.country.totalConfirmed)}</td>
          <td class="total">${numberWithCommas(this.country.totalDeaths)}</td>
          <td class="total">${numberWithCommas(this.country.totalRecovered)}</td>
        </tr>
        <tr>
          <th class="hide" colspan="3">For the last day</th>
        </tr>
        <tr class="hide">
          ${createTitle()}
        </tr>
        <tr>
          <td class="last__day hide">${numberWithCommas(this.country.newConfirmed)}</td>
          <td class="last__day hide">${numberWithCommas(this.country.newDeaths)}</td>
          <td class="last__day hide">${numberWithCommas(this.country.newRecovered)}</td>
        </tr>
        <tr>
          <th class="hide" colspan="3">per 100k</th>
        </tr>
        <tr class="hide">
          ${createTitle(this.country.TotalConfirmed100k)}
        </tr>
        <tr>
          <td class="per100 hide">${numberWithCommas(this.country.totalConfirmed100k)}</td>
          <td class="per100 hide">${numberWithCommas(this.country.totalDeaths100k)}</td>
          <td class="per100 hide">${numberWithCommas(this.country.totalRecovered100k)}</td>
        </tr>
        <tr class="hide">
          <th colspan="3">per 100k last day</th>
        </tr>
        <tr class="hide">
          ${createTitle()}
        </tr>
        <tr>
        <td class="per100__last-day hide">
          ${numberWithCommas(this.country.newConfirmed100k)}</td>
        <td class="per100__last-day hide">
          ${numberWithCommas(this.country.newDeaths100k)}</td>
        <td class="per100__last-day hide">
          ${numberWithCommas(this.country.newRecovered100k)}</td>
        </tr>
      </tbody>`;

    this.title = this.el.querySelector('.title');
    this.img = this.el.querySelector('.table__img');
    this.totalCases = this.el.querySelectorAll('.total');
    this.lastDay = this.el.querySelectorAll('.last__day');
    this.per100 = this.el.querySelectorAll('.per100');
    this.per100LastDay = this.el.querySelectorAll('.per100__last-day');

    wrraper.append(this.el);
    document.body.prepend(wrraper);
  }

  // switchMode(mod) {

  // }

  updateData(country) {
    const {
      name,
      newConfirmed,
      newDeaths,
      newRecovered,
      totalConfirmed,
      totalDeaths,
      totalRecovered,
      flag,
      newConfirmed100k,
      newDeaths100k,
      newRecovered100k,
      totalConfirmed100k,
      totalDeaths100k,
      totalRecovered100k,
    } = country;

    this.img.src = flag;
    this.title.textContent = name;

    this.totalCases[0].textContent = numberWithCommas(totalConfirmed);
    this.totalCases[1].textContent = numberWithCommas(totalDeaths);
    this.totalCases[2].textContent = numberWithCommas(totalRecovered);

    this.lastDay[0].textContent = numberWithCommas(newConfirmed);
    this.lastDay[1].textContent = numberWithCommas(newDeaths);
    this.lastDay[2].textContent = numberWithCommas(newRecovered);

    this.per100[0].textContent = numberWithCommas(totalConfirmed100k);
    this.per100[1].textContent = numberWithCommas(totalDeaths100k);
    this.per100[2].textContent = numberWithCommas(totalRecovered100k);

    this.per100LastDay[0].textContent = numberWithCommas(newConfirmed100k);
    this.per100LastDay[1].textContent = numberWithCommas(newDeaths100k);
    this.per100LastDay[2].textContent = numberWithCommas(newRecovered100k);
  }
}

export { BuildTable };
