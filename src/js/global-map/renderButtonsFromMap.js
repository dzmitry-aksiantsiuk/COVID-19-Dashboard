import renderButtonIcon from './renderIconForButtons';

const renderButtonsForMap = (polygonSeries, chart, worldData, cases) => {
  const confirmedButtonIconColor = am4core.color('#193eb4');
  const recoveredButtonIconColor = am4core.color('#72b710');
  const deathsButtonIconColor = am4core.color('#d62929');

  const buttonTotalConfirmed = chart.chartContainer.createChild(am4core.Button);
  buttonTotalConfirmed.label.text = 'Total Confirmed';
  buttonTotalConfirmed.align = 'left';
  buttonTotalConfirmed.valign = 'bottom';
  buttonTotalConfirmed.padding(5, 5, 5, 5);
  buttonTotalConfirmed.margin(0, 0, 10, 10);
  buttonTotalConfirmed.cursorOverStyle = am4core.MouseCursorStyle.pointer;
  buttonTotalConfirmed.events.on('hit', () => {
    // Updating the map data
    cases.splice(0, cases.length);
    worldData.forEach((country) => {
      // cases.push({ id: country.CountryCode, totalConfirmed: country.TotalConfirmed || 0 });
      cases.push({ id: country.CountryCode, value: country.TotalConfirmed || 1 });
    });
    polygonSeries.data = cases;

    // Updating the color of the map
    polygonSeries.heatRules.values.splice(0, polygonSeries.heatRules.length);
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#aec1ff'),
      max: am4core.color('#011a6b'),
      logarithmic: true,
    });
  });
  // Render icon for button
  renderButtonIcon(buttonTotalConfirmed, confirmedButtonIconColor);

  const buttonTotalRecovered = chart.chartContainer.createChild(am4core.Button);
  buttonTotalRecovered.label.text = 'Total Recovered';
  buttonTotalRecovered.align = 'left';
  buttonTotalRecovered.valign = 'bottom';
  buttonTotalRecovered.margin(0, 0, 10, 170);
  buttonTotalRecovered.padding(5, 5, 5, 5);
  buttonTotalRecovered.cursorOverStyle = am4core.MouseCursorStyle.pointer;
  buttonTotalRecovered.events.on('hit', () => {
    // Updating the map data
    cases.splice(0, cases.length);
    worldData.forEach((country) => {
      cases.push({ id: country.CountryCode, value: country.TotalRecovered || 1 });
    });
    polygonSeries.data = cases;

    // Updating the color of the map
    polygonSeries.heatRules.values.splice(0, polygonSeries.heatRules.length);
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#caff96'),
      max: am4core.color('#244800'),
      logarithmic: true,
    });
  });
  // Render icon for button
  renderButtonIcon(buttonTotalRecovered, recoveredButtonIconColor);

  const buttonTotalDeaths = chart.chartContainer.createChild(am4core.Button);
  buttonTotalDeaths.label.text = 'Total Deaths';
  buttonTotalDeaths.align = 'left';
  buttonTotalDeaths.valign = 'bottom';
  buttonTotalDeaths.margin(0, 0, 10, 330);
  buttonTotalDeaths.padding(5, 5, 5, 5);
  buttonTotalDeaths.cursorOverStyle = am4core.MouseCursorStyle.pointer;
  buttonTotalDeaths.events.on('hit', () => {
    // Updating the map data
    cases.splice(0, cases.length);
    worldData.forEach((country) => {
      cases.push({ id: country.CountryCode, value: country.TotalDeaths || 1 });
    });
    polygonSeries.data = cases;

    // Updating the color of the map
    polygonSeries.heatRules.values.splice(0, polygonSeries.heatRules.length);
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#ff9696'),
      max: am4core.color('#700b00'),
      logarithmic: true,
    });
  });
  // Render icon for button
  renderButtonIcon(buttonTotalDeaths, deathsButtonIconColor);
};

export default renderButtonsForMap;
