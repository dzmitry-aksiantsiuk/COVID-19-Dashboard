function numberWithCommas(str) {
  return String(str).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

class ContriesList {
  constructor(data) {
    this.data = data;
  }

  render() {
    this.wrraper = document.createElement('div');
    this.input = document.createElement('input');
    this.input.type = 'search';
    this.ul = document.createElement('ul');
    this.wrraper.classList.add('countries');
    this.input.classList.add('search__input');
    this.ul.classList.add('countries__list');
    this.updateData();
    this.wrraper.append(this.input);
    this.wrraper.append(this.ul);
    document.body.append(this.wrraper);
    this.search();
  }

  search() {
    this.input.addEventListener('input', this.updateData.bind(this));
  }

  updateData() {
    this.ul.innerHTML = '';
    this.data.filter((country) => country.name.toLowerCase().includes(this.input.value.toLowerCase()))
      .map((item) => {
        const li = document.createElement('li');
        const countryFlag = document.createElement('img');
        const countryName = document.createElement('h3');
        const countryInfo = document.createElement('div');
        const countryPopulation = document.createElement('div');
        const countryPopulationText = document.createElement('div');
        li.classList.add('country');
        countryFlag.classList.add('country__flag');
        countryName.classList.add('country__name');
        countryInfo.classList.add('country__info');
        countryPopulation.classList.add('country__population');
        countryPopulationText.classList.add('country__population--text');

        countryFlag.src = item.flag;
        countryName.innerText = item.name;
        countryPopulation.innerText = numberWithCommas(item.population);
        countryPopulationText.innerText = 'Population';

        countryInfo.append(countryPopulation, countryPopulationText);
        li.append(countryFlag, countryName, countryInfo);
        this.ul.append(li);
        return item;
      });
  }
}

export { ContriesList, numberWithCommas };
