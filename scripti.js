const apiKey = "4e6834ca28ff6ec8212ae50aa1282350";
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    
    if (!response.ok) {
      alert("Shahar topilmadi!");
      return;
    }

    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error("Xatolik:", error);
  }
}

function updateUI(data) {
  document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°`;
  document.getElementById("city-name").innerText = data.name;
  document.getElementById("weather-desc").innerText = data.weather[0].description;
  
  document.getElementById("temp-max").innerText = `${Math.round(data.main.temp_max)}°`;
  document.getElementById("temp-min").innerText = `${Math.round(data.main.temp_min)}°`;
  document.getElementById("humidity").innerText = `${data.main.humidity}%`;
  document.getElementById("clouds").innerText = `${data.clouds.all}%`;
  document.getElementById("wind").innerText = `${Math.round(data.wind.speed * 3.6)}km/h`;

  const iconCode = data.weather[0].icon;
  document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const date = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'short', year: '2-digit' };
  document.getElementById("date-time").innerText = `${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${date.toLocaleDateString('en-US', options)}`;
}

searchBtn.addEventListener("click", () => {
  if (searchInput.value.trim() !== "") getWeather(searchInput.value.trim());
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && searchInput.value.trim() !== "") {
    getWeather(searchInput.value.trim());
  }
});

getWeather("London");