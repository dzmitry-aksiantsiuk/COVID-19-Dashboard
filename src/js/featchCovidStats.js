async function featchCovidStats() {
  const url = 'https://api.covid19api.com/summary';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default featchCovidStats;
