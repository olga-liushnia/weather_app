function showCurrentTime() {
    let currentTime = new Date();
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thurthday",
      "Friday",
      "Saturday"
    ];
  
    let day = days[currentTime.getDay()];
    let hour = currentTime.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minute = currentTime.getMinutes();
    if (minute < 10) {
      minute = `0${minute}`;
    }
    let formatedTime = `${day} ${hour}:${minute}`;
    return formatedTime;
  }
  
  let currentTime = document.querySelector(".current-time");
  currentTime.innerHTML = showCurrentTime(new Date());
  setCurrentData();
  
  //part2
  function getCity(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#input-city");
  
    let city = inputCity.value;
    let apiKey = "62231151ce343c4d68652e1617efc22f";
    let unit = "metric";
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiLink).then(showTemp);
  }
  function showTemp(responce) {
    let currentCity = document.querySelector("#current-city");
    currentCity.innerHTML = responce.data.name;
    let temperature = Math.round(responce.data.main.temp);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = temperature;

    console.log(responce.data);

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

  }
  
  function getGeoCoords(position) {
    let latitude = position.coords.latitude;
  
    let longitude = position.coords.longitude;
  
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=62231151ce343c4d68652e1617efc22f`;
    axios.get(apiLink).then(showTemp);
  }
  
  function setCurrentData() {
    navigator.geolocation.getCurrentPosition(getGeoCoords);
  }
  
  let city = document.querySelector("#search-city");
  city.addEventListener("submit", getCity);
  
  let currentCity = document.querySelector("#btn-current-city");
  currentCity.addEventListener("click", setCurrentData);
  
  /*part3
  
  function toFarenheit() {
    let f = 3 * 1.8 + 32;
    let fRounded = Math.round(f);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = fRounded;
  }
  
  function toCelsius() {
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = 3;
  }
  
  let farenheit = document.querySelector("#farenheit");
  farenheit.addEventListener("click", toFarenheit);
  
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", toCelsius);
  */
  
  //week5hw