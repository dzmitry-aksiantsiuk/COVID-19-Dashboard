import { featchCovidStats } from '../fetchCovidStatsAndPopulation';
// import renderButtonsForMap from './renderButtonsFromMap';
import renderHeatLegendForMap from './renderHeatLegendForMap';
import renderDateForMap from './renderDateForMap';
import addHitEvents from './hitEvents';
import getDataCases from './getDataCases';
import { chart, polygonSeries } from './config';

const renderMap = async () => {
  const fetchedData = await featchCovidStats();
  const worldData = fetchedData.Countries;
  const date = fetchedData.Date;
  const cases = [];
  worldData.forEach((country) => {
    // cases.push({ id: country.CountryCode, totalConfirmed: country.TotalConfirmed });
    cases.push({ id: country.CountryCode, value: country.TotalConfirmed || 1, name: country.Country });
  });
  getDataCases(worldData);

  // Theme
  am4core.useTheme(am4themes_animated);

  // Create map instanc
  // const chart = am4core.create('global-map', am4maps.MapChart);

  // Set map definition
  chart.geodata = am4geodata_worldLow;

  // Set projection
  chart.projection = new am4maps.projections.Miller();

  // Create map polygon series
  // const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

  // Make map load polygon (like country names) data from GeoJSON
  polygonSeries.useGeodata = true;

  // Configure series
  const polygonTemplate = polygonSeries.mapPolygons.template;
  // polygonTemplate.tooltipText = '{name}: {totalConfirmed}';
  polygonTemplate.tooltipText = '{name}: {value}';
  polygonTemplate.propertyFields.id = 'name';
  polygonTemplate.fill = am4core.color('#3b3b3b');
  polygonTemplate.fillOpacity = 1;
  polygonTemplate.stroke = am4core.color('#ffffff');
  polygonTemplate.strokeOpacity = 0.25;

  // Create hover state and set alternative fill color
  const hs = polygonTemplate.states.create('hover');
  hs.properties.fill = am4core.color('#dbdbdb');

  // Remove Antarctica
  polygonSeries.exclude = ['AQ'];
  // getDataCases(worldData);
  // Гpdating the map data

  

  polygonSeries.data = cases;

  // Add heat rule
  polygonSeries.heatRules.push({
    property: 'fill',
    target: polygonSeries.mapPolygons.template,
    min: am4core.color('#aec1ff'),
    max: am4core.color('#011a6b'),
    logarithmic: true,
  });

  addHitEvents(polygonSeries);

  // Add Buttons
  // renderButtonsForMap(polygonSeries, chart, worldData, cases);

  // Add heat legend for map
  renderHeatLegendForMap(polygonSeries, chart);

  // add date for map
  renderDateForMap(chart, date);
};

export default renderMap;
