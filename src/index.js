
function setCurrentData() {
  navigator.geolocation.getCurrentPosition(getGeoCoords);
}
 
  
  function getCity(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#input-city");
  
    let city = inputCity.value;
    let apiKey = "62231151ce343c4d68652e1617efc22f";
    let unit = "metric";
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiLink).then(showTemp);
  }

  function formatDate (timestamp) {
   let date = new Date(timestamp);
   let hours = date.getHours();
   if (hours<10) {
    hours = `0${hours}`;
   }
   let minutes = date.getMinutes();
   if (minutes < 10) {
    minutes = `0${minutes}`;
  }
   let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurthday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
   
   return `${day} ${hours}:${minutes}`;
  

  }

  function showTemp(responce) {
    let currentCity = document.querySelector("#current-city");
    currentCity.innerHTML = responce.data.name;
    let temperature = Math.round(responce.data.main.temp);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = temperature;

    let description = responce.data.weather[0].description;
    let currentDescription = document.querySelector(".description");
    currentDescription.innerHTML = description; 

    let tempMax = Math.round(responce.data.main.temp_max);
    let currentTempMax = document.querySelector("#max-temp");
    currentTempMax.innerHTML = tempMax;
    let tempMin = Math.round(responce.data.main.temp_min);
    let currentTempMin = document.querySelector("#min-temp");
    currentTempMin.innerHTML = tempMin;

    let humidity = responce.data.main.humidity;
    let currentHumidity = document.querySelector("#humidity");
    currentHumidity.innerHTML = humidity;
    
    let wind = Math.round(responce.data.wind.speed);
    let currentWind = document.querySelector("#wind");
    currentWind.innerHTML = wind;
    
    let currentTime = document.querySelector(".current-time");
    currentTime.innerHTML = formatDate(responce.data.dt * 1000);

    celsiusValue = responce.data.main.temp;

    let icon = document.querySelector("#icon");
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`);
 
    icon.setAttribute("alt", responce.data.weather[0].description);
  }
  
  function getGeoCoords(position) {
    let latitude = position.coords.latitude;
  
    let longitude = position.coords.longitude;
  
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=62231151ce343c4d68652e1617efc22f`;
    axios.get(apiLink).then(showTemp);
  }
  
  
  function toFarenheit(event) {
    event.preventDefault();
    let f = (celsiusValue * 9) / 5 +32;
    let fRounded = Math.round(f);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = fRounded;
  }
  
  function toCelsius(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = Math.round(celsiusValue);
  }

  let city = document.querySelector("#search-city");
  city.addEventListener("submit", getCity);
  
  let currentCity = document.querySelector("#btn-current-city");
  currentCity.addEventListener("click", setCurrentData);
  
  let farenheit = document.querySelector("#farenheit");
  farenheit.addEventListener("click", toFarenheit);
  
  let celsiusValue = null;
  
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", toCelsius);
  
  setCurrentData();