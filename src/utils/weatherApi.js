export const getWeather = async ({ latitude, longitude }, apiKey) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  const res = await fetch(url);
  return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: data.main.temp,
    C: ((data.main.temp - 32) * 5) / 9,
  };
  result.description = data.weather[0].description;
  result.condition = data.weather[0].main.toLowerCase();
  result.type = getWeatherType(result.temp.F);

  result.isDay = isItDayTime(data.sys, Date.now());
  return result;
};

const getWeatherType = (tempature) => {
  if (tempature >= 86) return "hot";
  else if (tempature >= 66) return "warm";
  else return "cold";
};

const isItDayTime = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};
