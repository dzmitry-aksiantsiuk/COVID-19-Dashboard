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

class Table {
  constructor(data, flags) {
    this.global = data.Global;
    this.countries = data.Countries;
    this.flags = flags;
  }

  render() {
    const wrraper = document.createElement('div');
    wrraper.classList.add('tableWrraper');
    // const wrapper = document.querySelector('.tableWrapper');
    this.el = document.createElement('table');
    this.el.classList.add('table');
    this.el.innerHTML = /* html */`
      <thead>
        <tr>
          <th>Country</th>
          <th>Total Confirmed</th>
          <th>Total Deaths</th>
          <th>Total Recovered</th>
        </tr>
      </thead>
      <tbody class='table__body'>
        <tr>
          <td>World</td>
          <td>${this.global.TotalConfirmed}</td>
          <td>${this.global.TotalDeaths}</td>
          <td>${this.global.TotalRecovered}</td>
        </tr>
      </tbody>
      <tbody class='table__body'>
        ${this.countries.map((country) => `
          <tr>
            <td>
              <img class='table__img' src='${this.flags.find((c) => c.name === (countryMap[country.Country] || country.Country))?.flag}'>
              ${country.Country}
            </td>
            <td>${country.TotalConfirmed}</td>
            <td>${country.TotalDeaths}</td>
            <td>${country.TotalRecovered}</td>
          </tr>
        `).join('')}
      </tbody>`;
    wrraper.append(this.el);
    document.body.append(wrraper);
  }
}

export { Table };
