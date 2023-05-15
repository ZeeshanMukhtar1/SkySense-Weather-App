// Get HTML elements
const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

// Call weather API and update UI
async function checkWeather(city) {
  // const api_key = "4cd0eee81294c867b4bc4cfc64e998c5";
  const api_key = '5cc2b9d49d82522c8d63958130bfba74';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if (weather_data.cod === `404`) {
    // Show location not found error message and hide weather info
    location_not_found.style.display = 'flex';
    weather_body.style.display = 'none';
    return;
  }

  // Hide location not found error message and show weather info
  location_not_found.style.display = 'none';
  weather_body.style.display = 'flex';

  // Update weather info
  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

  // Update weather image based on weather condition
  switch (weather_data.weather[0].main) {
    case 'Clouds':
      weather_img.src = './assets/cloud.png';
      break;
    case 'Clear':
      weather_img.src = './assets/clear.png';
      break;
    case 'Rain':
      weather_img.src = './assets/rain.png';
      break;
    case 'Mist':
      weather_img.src = './assets/mist.png';
      break;
    case 'Snow':
      weather_img.src = './assets/snow.png';
      break;
  }
}

// Add event listener to search button
searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (inputBox.value.trim() === '') {
    // alert('Please enter a city first!');
    Toastify({
      text: 'Please enter a city first!',
      duration: 3000,
      close: true,
      gravity: 'top', // `top` or `bottom`
      position: 'center', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        // background: 'linear-gradient(to right, #00b09b, #96c93d)',
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    inputBox.focus();
    return;
  }
  checkWeather(inputBox.value);
});

// Add event listener to input box for enter key
inputBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    if (inputBox.value.trim() === '') {
      // alert('Please enter a city first!');
      Toastify({
        text: 'Please enter a city first!',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'center',
        stopOnFocus: true,
        style: {
          background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      inputBox.focus();
      return;
    }
    checkWeather(inputBox.value);
  }
});
// Update clock
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Convert to 12-hour format
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight

  // Get HTML elements for clock
  const clock = document.querySelector('.clock');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');
  const ampmSpan = clock.querySelector('.ampm');

  // Update clock HTML elements
  hoursSpan.innerHTML = formatTime(hours);
  minutesSpan.innerHTML = formatTime(minutes);
  secondsSpan.innerHTML = formatTime(seconds);
  ampmSpan.innerHTML = ampm;
}

// Format time with leading zero
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Update clock every second
setInterval(updateClock, 1000);
