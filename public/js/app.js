console.log('Client side JavaScript running');

const weatherForm = document.querySelector('#weather-form');
const input = document.querySelector('#location');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = input.value.trim();

    if (!location) {
        messageOne.textContent = 'Please enter a location';
        messageTwo.textContent = '';
        return;
    }

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = `Weather for ${data.location}`;
                messageTwo.textContent = `${data.weather_descriptions}. Temperature: ${data.temperature}°C, Feels like: ${data.feels_like}°C. Humidity: ${data.humidity}%, Wind speed: ${data.wind_speed} km/h, UV Index: ${data.uv_index}`;
            }
        });
    }).catch((error) => {
        messageOne.textContent = 'Unable to fetch weather data';
        messageTwo.textContent = '';
    });
});