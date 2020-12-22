const addHitEvents = (polygonSeries) => {
  // Add hit events
  polygonSeries.mapPolygons.template.events.on('hit', (ev) => {
    console.log(ev.target);
    const { chart } = ev.target.series;
    chart.zoomToMapObject(ev.target);
  });
};

export default addHitEvents;
