
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Weather App</title>
<link rel="stylesheet" href="index.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet">
<script src="https://cdn.tailwindcss.com/3.4.16"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.5.0/echarts.min.js"></script>
<script>tailwind.config={theme:{extend:{colors:{primary:'#3b82f6',secondary:'#64748b'},borderRadius:{'none':'0px','sm':'4px',DEFAULT:'8px','md':'12px','lg':'16px','xl':'20px','2xl':'24px','3xl':'32px','full':'9999px','button':'8px'}}}}</script>
<style>

</style>
</head>
<body>
<div class="min-h-screen flex flex-col">
<!-- Header -->
<header class="bg-white shadow-sm">
<div class="container mx-auto px-4 py-4 flex items-center justify-between">
<div class="flex items-center">
<h1 class="text-2xl font-['Pacifico'] text-primary">WeatherNow</h1>
</div>
<div class="relative flex-1 max-w-md mx-8">
<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
<div class="w-5 h-5 flex items-center justify-center text-gray-400">
<i class="ri-search-line"></i>
</div>
</div>
<input type="text" class="w-full pl-10 pr-4 py-2 border-none bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Search for a city..." id="input" value="San Francisco">
<button class="absolute inset-y-0 right-0 flex items-center pr-3 text-primary" onclick=" getWeather() ">
<div class="w-5 h-5 flex items-center justify-center">
<i class="ri-map-pin-line"></i>
</div>
</button>
</div>
<div class="flex items-center space-x-4">
<button class="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary transition-colors !rounded-button">
<div class="w-5 h-5 flex items-center justify-center">
<i class="ri-map-pin-user-line"></i>
</div>
<span class="whitespace-nowrap">Current Location</span>
</button>
<div class="text-right">
<p class="text-sm text-gray-600" id="liveDate">Thursday, Apr 17</p>
<p class="text-sm font-medium" id="liveClock">10:45 AM</p>
</div>
</div>
</div>
</header>
<!-- Main Content -->
<main class="flex-grow">
<!-- Current Weather Section -->
<section class="weather-gradient-sunny text-white py-16 relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-transparent"></div>
<div class="weather-background">
<div class="sun"></div>
<div class="cloud cloud-1"></div>
<div class="cloud cloud-2"></div>
<div class="rain rain-1"></div>
<div class="rain rain-2"></div>
<div class="rain rain-3"></div>
<div class="rain rain-4"></div>
</div>
<div class="container mx-auto px-4 relative z-10">
<div class="flex flex-col md:flex-row items-center justify-between">
<div class="mb-8 md:mb-0 text-center md:text-left">
<h2 class="text-2xl font-medium mb-2" id="place">San Francisco</h2>

<div class="flex items-center justify-center md:justify-start space-x-2 mb-6">
<div class="w-5 h-5 flex items-center justify-center">
<i class="ri-time-line"></i>
</div>
<p class="text-sm">Last updated: </p>
</div>
<div class="flex flex-col md:flex-row items-center md:space-x-8">
<div class="text-8xl font-light mb-4 md:mb-0 temperature-display" id="degree">72°</div>
<div>
<p class="text-2xl font-medium mb-2" id="condition">Sunny</p>
<div class="flex items-center space-x-6">
<div class="flex items-center">
<div class="w-5 h-5 flex items-center justify-center mr-1">
<i class="ri-arrow-up-line"></i>
</div>
<span>78°</span>
</div>
<div class="flex items-center">
<div class="w-5 h-5 flex items-center justify-center mr-1">
<i class="ri-arrow-down-line"></i>
</div>
<span>65°</span>
</div>
</div>
</div>
</div>
</div>
<div class="flex flex-col items-center">
<div class="w-32 h-32 flex items-center justify-center text-8xl mb-4 weather-icon">
<i class="ri-sun-line"></i>
</div>
<div class="grid grid-cols-2 gap-x-8 gap-y-4 text-center">
<div>
<p class="text-sm opacity-80">Humidity</p>
<p class="text-xl font-medium">45%</p>
</div>
<div>
<p class="text-sm opacity-80">Wind</p>
<p class="text-xl font-medium">8 mph</p>
</div>
<div>
<p class="text-sm opacity-80">Feels Like</p>
<p class="text-xl font-medium">75°</p>
</div>
<div>
<p class="text-sm opacity-80">Precipitation</p>
<p class="text-xl font-medium">0%</p>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Temperature Chart -->
<section class="py-10 bg-white">
<div class="container mx-auto px-4">
<div class="flex items-center justify-between mb-6">
<h2 class="text-xl font-semibold text-gray-800">Hourly Forecast</h2>
<div class="flex items-center space-x-4">
<label class="custom-switch">
<input type="checkbox" id="tempUnitToggle">
<span class="switch-slider"></span>
</label>
<span class="text-sm font-medium">°F / °C</span>
</div>
</div>
<div class="bg-white rounded-lg shadow-sm p-4 h-64" id="hourlyChart"></div>
</div>
</section>
<!-- 7-Day Forecast -->
<section class="py-10 bg-gray-50">
<div class="container mx-auto px-4">
<h2 class="text-xl font-semibold text-gray-800 mb-6">7-Day Forecast</h2>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
<div class="forecast-card bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-lg p-6 flex flex-col items-center transform hover:scale-105 transition-all duration-300">
<p class="font-medium text-gray-800 mb-2">Today</p>
<div class="weather-icon-container w-24 h-24 relative mb-3">
<img src="https://readdy.ai/api/search-image?query=cute%20cartoon%20sun%20character%20with%20happy%20smiling%20face%2C%20simple%20background%2C%20kawaii%20style%2C%20vector%20art%20illustration&width=200&height=200&seq=1&orientation=squarish" class="w-full h-full object-contain animate-bounce-slow" alt="Sunny">
</div>
<p class="text-sm font-medium text-primary mb-3">Sunny</p>
<div class="flex items-center space-x-3">
<span class="text-lg font-semibold text-gray-800">78°</span>
<div class="h-4 w-px bg-gray-300"></div>
<span class="text-gray-500">65°</span>
</div>
</div>
<div class="forecast-card bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-lg p-6 flex flex-col items-center transform hover:scale-105 transition-all duration-300">
<p class="font-medium text-gray-800 mb-2">Fri</p>
<div class="weather-icon-container w-24 h-24 relative mb-3">
<img src="https://readdy.ai/api/search-image?query=cute%20cartoon%20sun%20behind%20cloud%20character%20with%20happy%20face%2C%20simple%20background%2C%20kawaii%20style%2C%20vector%20art%20illustration&width=200&height=200&seq=2&orientation=squarish" class="w-full h-full object-contain animate-float" alt="Partly Cloudy">
</div>
<p class="text-sm font-medium text-primary mb-3">Partly Cloudy</p>
<div class="flex items-center space-x-3">
<span class="text-lg font-semibold text-gray-800">76°</span>
<div class="h-4 w-px bg-gray-300"></div>
<span class="text-gray-500">64°</span>
</div>
</div>
<div class="forecast-card bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-lg p-6 flex flex-col items-center transform hover:scale-105 transition-all duration-300">
<p class="font-medium text-gray-800 mb-2">Sat</p>
<div class="weather-icon-container w-24 h-24 relative mb-3">
<img src="https://readdy.ai/api/search-image?query=cute%20cartoon%20cloud%20character%20with%20sleepy%20face%2C%20simple%20background%2C%20kawaii%20style%2C%20vector%20art%20illustration&width=200&height=200&seq=3&orientation=squarish" class="w-full h-full object-contain animate-pulse" alt="Cloudy">
</div>
<p class="text-sm font-medium text-primary mb-3">Cloudy</p>
<div class="flex items-center space-x-3">
<span class="text-lg font-semibold text-gray-800">72°</span>
<div class="h-4 w-px bg-gray-300"></div>
<span class="text-gray-500">63°</span>
</div>
</div>
<div class="forecast-card bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-lg p-6 flex flex-col items-center transform hover:scale-105 transition-all duration-300">
<p class="font-medium text-gray-800 mb-2">Sun</p>
<div class="weather-icon-container w-24 h-24 relative mb-3">
<img src="https://readdy.ai/api/search-image?query=cute%20cartoon%20cloud%20character%20with%20light%20rain%20drops%20and%20umbrella%2C%20simple%20background%2C%20kawaii%20style%2C%20vector%20art%20illustration&width=200&height=200&seq=4&orientation=squarish" class="w-full h-full object-contain animate-drizzle" alt="Showers">
</div>
<p class="text-sm font-medium text-primary mb-3">Showers</p>
<div class="flex items-center space-x-3">
<span class="text-lg font-semibold text-gray-800">68°</span>
<div class="h-4 w-px bg-gray-300"></div>
<span class="text-gray-500">60°</span>
</div>
</div>
<div class="forecast-card bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-lg p-6 flex flex-col items-center transform hover:scale-105 transition-all duration-300">
<p class="font-medium text-gray-800 mb-2">Mon</p>
<div class="weather-icon-container w-24 h-24 relative mb-3">
<img src="https://readdy.ai/api/search-image?query=cute%20cartoon%20cloud%20character%20with%20heavy%20rain%20drops%20and%20sad%20face%2C%20simple%20background%2C%20kawaii%20style%2C%20vector%20art%20illustration&width=200&height=200&seq=5&orientation=squarish" class="w-full h-full object-contain animate-rain" alt="Rain">
</div>
<p class="text-sm font-medium text-primary mb-3">Rain</p>
<div class="flex items-center space-x-3">
<span class="text-lg font-semibold text-gray-800">65°</span>
<div class="h-4 w-px bg-gray-300"></div>
<span class="text-gray-500">58°</span>
</div>
</div>
<div class="forecast-card bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-lg p-6 flex flex-col items-center transform hover:scale-105 transition-all duration-300">
<p class="font-medium text-gray-800 mb-2">Tue</p>
<div class="weather-icon-container w-24 h-24 relative mb-3">
<img src="https://readdy.ai/api/search-image?query=cute%20cartoon%20cloud%20character%20with%20heavy%20rain%20drops%20and%20thunder%2C%20simple%20background%2C%20kawaii%20style%2C%20vector%20art%20illustration&width=200&height=200&seq=6&orientation=squarish" class="w-full h-full object-contain animate-storm" alt="Rain">
</div>
<p class="text-sm font-medium text-primary mb-3">Rain</p>
<div class="flex items-center space-x-3">
<span class="text-lg font-semibold text-gray-800">67°</span>
<div class="h-4 w-px bg-gray-300"></div>
<span class="text-gray-500">59°</span>
</div>
</div>
<div class="forecast-card bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-lg p-6 flex flex-col items-center transform hover:scale-105 transition-all duration-300">
<p class="font-medium text-gray-800 mb-2">Wed</p>
<div class="weather-icon-container w-24 h-24 relative mb-3">
<img src="https://readdy.ai/api/search-image?query=cute%20cartoon%20sun%20peeking%20from%20behind%20cloud%20character%20with%20happy%20face%2C%20simple%20background%2C%20kawaii%20style%2C%20vector%20art%20illustration&width=200&height=200&seq=7&orientation=squarish" class="w-full h-full object-contain animate-float" alt="Partly Cloudy">
</div>
<p class="text-sm font-medium text-primary mb-3">Partly Cloudy</p>
<div class="flex items-center space-x-3">
<span class="text-lg font-semibold text-gray-800">70°</span>
<div class="h-4 w-px bg-gray-300"></div>
<span class="text-gray-500">61°</span>
</div>
</div>
</div>
</div>
</section>
<!-- Weather Details -->
<section class="py-10 bg-white">
<div class="container mx-auto px-4">
<h2 class="text-xl font-semibold text-gray-800 mb-6">Weather Details</h2>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div class="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300">
<div class="grid grid-cols-2 gap-6">
<div class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
<p class="text-sm text-gray-500 mb-3">Sunrise</p>
<div class="flex items-center justify-between">
<div class="flex items-center">
<img src="https://readdy.ai/api/search-image?query=cute%20cartoon%20sun%20rising%20over%20horizon%20with%20happy%20face%2C%20simple%20background%2C%20kawaii%20style%2C%20vector%20art%20illustration&width=100&height=100&seq=8&orientation=squarish" class="w-12 h-12 object-contain animate-bounce-slow mr-3" alt="Sunrise">
<p class="font-medium">6:23 AM</p>
</div>
</div>
</div>
<div class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
<p class="text-sm text-gray-500 mb-3">Sunset</p>
<div class="flex items-center justify-between">
<div class="flex items-center">
<img src="https://readdy.ai/api/search-image?query=cute%20cartoon%20sun%20setting%20behind%20horizon%20with%20sleepy%20face%2C%20simple%20background%2C%20kawaii%20style%2C%20vector%20art%20illustration&width=100&height=100&seq=9&orientation=squarish" class="w-12 h-12 object-contain animate-float mr-3" alt="Sunset">
<p class="font-medium">7:48 PM</p>
</div>
</div>
</div>
<div class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
<p class="text-sm text-gray-500 mb-3">Humidity</p>
<div class="flex items-center justify-between">
<div class="flex items-center">
<img src="https://readdy.ai/api/search-image?query=cute%20cartoon%20water%20droplet%20character%20with%20happy%20face%2C%20simple%20background%2C%20kawaii%20style%2C%20vector%20art%20illustration&width=100&height=100&seq=10&orientation=squarish" class="w-12 h-12 object-contain animate-drizzle mr-3" alt="Humidity">
<p class="font-medium">45%</p>
</div>
</div>
</div>
<div class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
<p class="text-sm text-gray-500 mb-3">Pressure</p>
<div class="flex items-center justify-between">
<div class="flex items-center">
<img src="https://readdy.ai/api/search-image?query=cute%20cartoon%20gauge%20meter%20character%20with%20determined%20face%2C%20simple%20background%2C%20kawaii%20style%2C%20vector%20art%20illustration&width=100&height=100&seq=11&orientation=squarish" class="w-12 h-12 object-contain animate-pulse mr-3" alt="Pressure">
<p class="font-medium">1012 hPa</p>
</div>
</div>
</div>
</div>
</div>
<div class="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300">
<div class="grid grid-cols-2 gap-6">
<div class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
<p class="text-sm text-gray-500 mb-3">Wind</p>
<div class="flex items-center justify-between">
<div class="flex items-center">
<img src="https://readdy.ai/api/search-image?query=cute%20cartoon%20wind%20character%20blowing%20with%20puffy%20cheeks%2C%20simple%20background%2C%20kawaii%20style%2C%20vector%20art%20illustration&width=100&height=100&seq=12&orientation=squarish" class="w-12 h-12 object-contain animate-float mr-3" alt="Wind">
<p class="font-medium">8 mph</p>
</div>
</div>
</div>
<div class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
<p class="text-sm text-gray-500 mb-3">UV Index</p>
<div class="flex items-center justify-between">
<div class="flex items-center">
<img src="https://readdy.ai/api/search-image?query=cute%20cartoon%20sun%20wearing%20sunglasses%20with%20cool%20expression%2C%20simple%20background%2C%20kawaii%20style%2C%20vector%20art%20illustration&width=100&height=100&seq=13&orientation=squarish" class="w-12 h-12 object-contain animate-pulse mr-3" alt="UV Index">
<p class="font-medium">6 (High)</p>
</div>
</div>
</div>
<div class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
<p class="text-sm text-gray-500 mb-3">Visibility</p>
<div class="flex items-center justify-between">
<div class="flex items-center">
<img src="https://readdy.ai/api/search-image?query=cute%20cartoon%20eye%20character%20with%20magnifying%20glass%2C%20simple%20background%2C%20kawaii%20style%2C%20vector%20art%20illustration&width=100&height=100&seq=14&orientation=squarish" class="w-12 h-12 object-contain animate-bounce-slow mr-3" alt="Visibility">
<p class="font-medium">10 mi</p>
</div>
</div>
</div>
<div class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
<p class="text-sm text-gray-500 mb-3">Feels Like</p>
<div class="flex items-center justify-between">
<div class="flex items-center">
<img src="https://readdy.ai/api/search-image?query=cute%20cartoon%20thermometer%20character%20with%20cozy%20expression%2C%20simple%20background%2C%20kawaii%20style%2C%20vector%20art%20illustration&width=100&height=100&seq=15&orientation=squarish" class="w-12 h-12 object-contain animate-float mr-3" alt="Feels Like">
<p class="font-medium">75°</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Settings Section -->
<section class="py-10 bg-gray-50 settings-section">
<div class="container mx-auto px-4">
<h2 class="text-xl font-semibold text-gray-800 mb-6">Settings</h2>
<div class="bg-white rounded-lg shadow-sm p-6">
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<h3 class="text-lg font-medium text-gray-800 mb-4">Units</h3>
<div class="space-y-4">
<div class="flex items-center justify-between">
<span class="text-gray-700">Temperature</span>
<div class="flex items-center space-x-4">
<label class="inline-flex items-center">
<input type="radio" name="temperature" class="hidden" checked>
<span class="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center mr-2 relative">
<span class="w-2 h-2 rounded-full bg-primary absolute"></span>
</span>
<span>°F</span>
</label>
<label class="inline-flex items-center">
<input type="radio" name="temperature" class="hidden">
<span class="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center mr-2 relative">
<span class="w-2 h-2 rounded-full bg-transparent absolute"></span>
</span>
<span>°C</span>
</label>
</div>
</div>
<div class="flex items-center justify-between">
<span class="text-gray-700">Wind Speed</span>
<div class="flex items-center space-x-4">
<label class="inline-flex items-center">
<input type="radio" name="wind" class="hidden" checked>
<span class="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center mr-2 relative">
<span class="w-2 h-2 rounded-full bg-primary absolute"></span>
</span>
<span>mph</span>
</label>
<label class="inline-flex items-center">
<input type="radio" name="wind" class="hidden">
<span class="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center mr-2 relative">
<span class="w-2 h-2 rounded-full bg-transparent absolute"></span>
</span>
<span>km/h</span>
</label>
</div>
</div>
<div class="flex items-center justify-between">
<span class="text-gray-700">Pressure</span>
<div class="flex items-center space-x-4">
<label class="inline-flex items-center">
<input type="radio" name="pressure" class="hidden" checked>
<span class="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center mr-2 relative">
<span class="w-2 h-2 rounded-full bg-primary absolute"></span>
</span>
<span>hPa</span>
</label>
<label class="inline-flex items-center">
<input type="radio" name="pressure" class="hidden">
<span class="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center mr-2 relative">
<span class="w-2 h-2 rounded-full bg-transparent absolute"></span>
</span>
<span>inHg</span>
</label>
</div>
</div>
</div>
</div>
<div>
<h3 class="text-lg font-medium text-gray-800 mb-4">Display</h3>
<div class="space-y-4">
<div class="flex items-center justify-between">
<span class="text-gray-700">Dark Mode</span>
<label class="custom-switch">
<input type="checkbox">
<span class="switch-slider"></span>
</label>
</div>
<div class="flex items-center justify-between">
<span class="text-gray-700">Notifications</span>
<label class="custom-switch">
<input type="checkbox" checked>
<span class="switch-slider"></span>
</label>
</div>
<div>
<label class="block text-gray-700 mb-2">Refresh Rate</label>
<input type="range" min="1" max="60" value="30" class="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer">
<div class="flex justify-between text-xs text-gray-500 mt-1">
<span>1 min</span>
<span>30 min</span>
<span>60 min</span>
</div>
</div>
</div>
</div>
</div>
<div class="mt-6 pt-6 border-t border-gray-200 flex justify-end">
<button class="bg-primary text-white px-4 py-2 rounded-button whitespace-nowrap hover:bg-primary/90 transition-colors">Save Settings</button>
</div>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-gray-800 text-white py-8">
<div class="container mx-auto px-4">
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<div>
<h3 class="text-lg font-medium mb-4">WeatherNow</h3>
<p class="text-gray-400 text-sm">Providing accurate weather forecasts and real-time updates to help you plan your day with confidence.</p>
</div>
<div>
<h3 class="text-lg font-medium mb-4">Quick Links</h3>
<ul class="space-y-2 text-sm text-gray-400">
<li><a href="#" class="hover:text-white transition-colors">Home</a></li>
<li><a href="#" class="hover:text-white transition-colors">Radar Map</a></li>
<li><a href="#" class="hover:text-white transition-colors">Severe Weather Alerts</a></li>
<li><a href="#" class="hover:text-white transition-colors">Weather News</a></li>
</ul>
</div>
<div>
<h3 class="text-lg font-medium mb-4">Connect With Us</h3>
<div class="flex space-x-4 mb-4">
<a href="#" class="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-primary transition-colors">
<i class="ri-twitter-x-line"></i>
</a>
<a href="#" class="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-primary transition-colors">
<i class="ri-facebook-fill"></i>
</a>
<a href="#" class="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-primary transition-colors">
<i class="ri-instagram-line"></i>
</a>
<a href="#" class="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:bg-primary transition-colors">
<i class="ri-youtube-line"></i>
</a>
</div>
<p class="text-sm text-gray-400">Download our mobile app:</p>
<div class="flex space-x-3 mt-2">
<a href="#" class="flex items-center space-x-1 text-sm hover:text-white transition-colors">
<div class="w-5 h-5 flex items-center justify-center">
<i class="ri-apple-fill"></i>
</div>
<span>iOS</span>
</a>
<a href="#" class="flex items-center space-x-1 text-sm hover:text-white transition-colors">
<div class="w-5 h-5 flex items-center justify-center">
<i class="ri-android-fill"></i>
</div>
<span>Android</span>
</a>
</div>
</div>
</div>
<div class="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
<p class="text-sm text-gray-400 mb-4 md:mb-0">© 2025 WeatherNow. All rights reserved.</p>
<div class="flex space-x-4 text-sm text-gray-400">
<a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
<a href="#" class="hover:text-white transition-colors">Terms of Service</a>
<a href="#" class="hover:text-white transition-colors">Contact Us</a>
</div>
</div>
</div>
</footer>
</div>
<script src="script.js"></script>

</body>
</html>
