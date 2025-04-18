
document.addEventListener('DOMContentLoaded', function() {
// Load saved preferences
const savedPreferences = JSON.parse(localStorage.getItem('weatherAppPreferences')) || {
darkMode: false,
notifications: false,
temperatureUnit: 'F'
};
// Initialize switches based on saved preferences
const darkModeSwitch = document.querySelector('input[type="checkbox"]');
const notificationsSwitch = document.querySelectorAll('input[type="checkbox"]')[1];
const temperatureUnitSwitch = document.getElementById('tempUnitToggle');
darkModeSwitch.checked = savedPreferences.darkMode;
notificationsSwitch.checked = savedPreferences.notifications;
temperatureUnitSwitch.checked = savedPreferences.temperatureUnit === 'C';
// Apply initial theme
if (savedPreferences.darkMode) {
document.documentElement.setAttribute('data-theme', 'dark');
}
// Dark Mode Toggle
darkModeSwitch.addEventListener('change', function() {
if (this.checked) {
document.documentElement.setAttribute('data-theme', 'dark');
} else {
document.documentElement.setAttribute('data-theme', 'light');
}
savedPreferences.darkMode = this.checked;
localStorage.setItem('weatherAppPreferences', JSON.stringify(savedPreferences));
});
// Notifications Toggle
notificationsSwitch.addEventListener('change', function() {
if (this.checked) {
Notification.requestPermission().then(function(permission) {
if (permission !== 'granted') {
notificationsSwitch.checked = false;
}
});
}
savedPreferences.notifications = this.checked;
localStorage.setItem('weatherAppPreferences', JSON.stringify(savedPreferences));
});
// Temperature Unit Toggle Helper Function
function convertTemperature(value, toUnit) {
if (toUnit === 'C') {
return Math.round((value - 32) * 5 / 9);
} else {
return Math.round((value * 9 / 5) + 32);
}
}
// Temperature Unit Toggle
temperatureUnitSwitch.addEventListener('change', function() {
const unit = this.checked ? 'C' : 'F';
savedPreferences.temperatureUnit = unit;
localStorage.setItem('weatherAppPreferences', JSON.stringify(savedPreferences));
// Update all temperature displays
document.querySelectorAll('.temperature-display, [data-temperature]').forEach(el => {
const temp = parseInt(el.textContent);
if (!isNaN(temp)) {
const newTemp = convertTemperature(temp, unit);
el.textContent = `${newTemp}°`;
}
});
// Update chart temperatures
if (hourlyChart) {
const newData = hourlyOption.series[0].data.map(temp => convertTemperature(temp, unit));
hourlyOption.series[0].data = newData;
hourlyOption.yAxis.min = unit === 'C' ? 15 : 60;
hourlyOption.yAxis.max = unit === 'C' ? 30 : 80;
hourlyChart.setOption(hourlyOption);
}
});
// Weather background animation control
const weatherSection = document.querySelector('.weather-gradient-sunny');
const weatherBackground = weatherSection.querySelector('.weather-background');
function updateWeatherAnimation(weatherType) {
const sun = weatherBackground.querySelector('.sun');
const clouds = weatherBackground.querySelectorAll('.cloud');
const rains = weatherBackground.querySelectorAll('.rain');
switch(weatherType) {
case 'sunny':
sun.style.display = 'block';
clouds.forEach(cloud => cloud.style.display = 'none');
rains.forEach(rain => rain.style.display = 'none');
weatherSection.className = 'weather-gradient-sunny text-white py-16 relative overflow-hidden';
break;
case 'cloudy':
sun.style.display = 'none';
clouds.forEach(cloud => cloud.style.display = 'block');
rains.forEach(rain => rain.style.display = 'none');
weatherSection.className = 'weather-gradient-cloudy text-white py-16 relative overflow-hidden';
break;
case 'rainy':
sun.style.display = 'none';
clouds.forEach(cloud => cloud.style.display = 'block');
rains.forEach(rain => rain.style.display = 'block');
weatherSection.className = 'weather-gradient-rainy text-white py-16 relative overflow-hidden';
break;
}
}
// Demo: Change weather every 5 seconds
const weatherTypes = ['sunny', 'cloudy', 'rainy'];
let currentWeatherIndex = 0;
setInterval(() => {
currentWeatherIndex = (currentWeatherIndex + 1) % weatherTypes.length;
updateWeatherAnimation(weatherTypes[currentWeatherIndex]);
}, 5000);
// Initialize the hourly chart
const hourlyChart = echarts.init(document.getElementById('hourlyChart'));
const hourlyOption = {
animation: {
duration: 1000,
easing: 'cubicOut'
},
tooltip: {
trigger: 'axis',
backgroundColor: 'rgba(255, 255, 255, 0.95)',
borderColor: '#e5e7eb',
textStyle: {
color: '#1f2937'
},
extraCssText: 'box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); border-radius: 8px;',
formatter: function(params) {
let result = `<div class="font-medium">${params[0].axisValue}</div>`;
params.forEach(param => {
result += `<div class="flex items-center mt-2">
<span style="color: ${param.color}">●</span>
<span class="ml-2">${param.seriesName}: ${param.value}${param.seriesName === 'Temperature' ? '°' : '%'}</span>
</div>`;
});
return result;
}
},
grid: {
left: '3%',
right: '4%',
bottom: '3%',
top: '3%',
containLabel: true
},
xAxis: {
type: 'category',
boundaryGap: false,
data: ['11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM'],
axisLine: {
lineStyle: {
color: '#e5e7eb'
}
},
axisTick: {
show: false
},
axisLabel: {
color: '#6b7280'
}
},
yAxis: {
type: 'value',
min: 60,
max: 80,
axisLine: {
show: false
},
axisTick: {
show: false
},
splitLine: {
lineStyle: {
color: '#f3f4f6'
}
},
axisLabel: {
color: '#6b7280'
}
},
series: [
{
name: 'Temperature',
type: 'line',
smooth: true,
symbol: 'circle',
symbolSize: 8,
itemStyle: {
color: 'rgba(87, 181, 231, 1)'
},
lineStyle: {
width: 3,
color: 'rgba(87, 181, 231, 1)'
},
areaStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{
offset: 0,
color: 'rgba(87, 181, 231, 0.3)'
},
{
offset: 1,
color: 'rgba(87, 181, 231, 0.05)'
}
])
},
data: [72, 74, 76, 77, 78, 77, 75, 73, 70, 68, 66, 65]
},
{
name: 'Precipitation',
type: 'bar',
barWidth: '60%',
itemStyle: {
color: 'rgba(141, 211, 199, 0.5)',
borderRadius: [4, 4, 0, 0]
},
data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 15]
}
]
};
hourlyChart.setOption(hourlyOption);
// Handle window resize
window.addEventListener('resize', function() {
hourlyChart.resize();
});
// Temperature unit toggle
const tempUnitToggle = document.getElementById('tempUnitToggle');
tempUnitToggle.addEventListener('change', function() {
// This would convert temperatures in a real app
// For demo purposes, we'll just update the chart
if (this.checked) {
// Convert to Celsius
hourlyOption.series[0].data = hourlyOption.series[0].data.map(temp => Math.round((temp - 32) * 5 / 9));
hourlyOption.yAxis.min = 15;
hourlyOption.yAxis.max = 30;
} else {
// Convert to Fahrenheit
hourlyOption.series[0].data = [72, 74, 76, 77, 78, 77, 75, 73, 70, 68, 66, 65];
hourlyOption.yAxis.min = 60;
hourlyOption.yAxis.max = 80;
}
hourlyChart.setOption(hourlyOption);
});
// Radio buttons
const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach(radio => {
radio.addEventListener('change', function() {
if (this.checked) {
// Find all radio buttons with the same name
const name = this.getAttribute('name');
const radios = document.querySelectorAll(`input[name="${name}"]`);
// Update the visual state of all radio buttons in the group
radios.forEach(r => {
const indicator = r.nextElementSibling.querySelector('span');
if (r === this) {
indicator.classList.remove('bg-transparent');
indicator.classList.add('bg-primary');
} else {
indicator.classList.remove('bg-primary');
indicator.classList.add('bg-transparent');
}
});
}
});
});
});
async function getWeather() {
    console.log("hello");
    const city = document.getElementById('input').value;
    const apiKey = "3a220050b38c4002b63a002e014d8adb"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a220050b38c4002b63a002e014d8adb`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const lon=data.coord.lon;
            const lat=data.coord.lat;
            document.getElementById("degree").innerText=temperature;
            document.getElementById("place").innerText=data.name;
            document.getElementById("lat").innerText=lat;
            document.getElementById("lon").innerText=lon;
          
            document.getElementById("condition")=weatherDescription;
     
            if(weatherDescription=='broken clouds'){
                document.getElementById('weather').style.backgroundImage="url(morning.jpg)"
            }
            else{
                 document.getElementById('weather').style.backgroundImage="url(rain.jpg)"
            }
        } else {
            document.getElementById('result').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        document.getElementById('result').innerHTML = `<p>Error fetching data</p>`;
    }
}
function updateClockAndDate() {
    const now = new Date();
  
    
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;
    document.getElementById('liveClock').textContent = currentTime;
  

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = now.toLocaleDateString('en-US', options);
    document.getElementById('liveDate').textContent = currentDate;
  }
  

  updateClockAndDate();
  setInterval(updateClockAndDate, 1000);
  
  