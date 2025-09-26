export default function WeatherCard({ weather }: { weather: any }) {
    if (!weather) return null

    return (
        <div className="bg-white self-center ml-3 w-[50%] text-gray-800 p-6 rounded-xl shadow-xl mt-6">
            <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</p>
                    <p className="capitalize">{weather.weather[0].description}</p>
                    <p>
                        Day {Math.round(weather.main.temp_max)}° • Night {Math.round(weather.main.temp_min)}°
                    </p>
                </div>
                <img
                    alt={weather.weather[0].description}
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    className="w-20 h-20"
                />
            </div>
            <div className="flex justify-between items-center mt-4 border-t pt-4">
                <div className="text-center">
                    <p className="text-lg font-semibold">{weather.wind.speed} m/s</p>
                    <p className="text-sm">Wind Speed</p>
                </div>
                <div className="text-center">
                    <p className="text-lg font-semibold">{weather.main.humidity}%</p>
                    <p className="text-sm">Humidity</p>
                </div>
            </div>
        </div>
    )
}
