'use client'

import { useState } from 'react'

import Image from "next/image";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import WeatherCard from "@/components/weather_card";
import AirQualityCard from '@/components/aqi';


export default function Home() {
  const [weather, setWeather] = useState<any>(null)
  const [aqi, setAqi] = useState<number | null>(null)
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  const fetchWeather = async (city: string) => {
  if (!city) return
  try {
    // fetch weather
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
    if (!res.ok) throw new Error('City not found')
    const data = await res.json()
    setWeather(data)

    // fetch AQI using coords
    const { lat, lon } = data.coord
    const aqiRes = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
    )
    const aqiData = await aqiRes.json()
    // aqi value: aqiData.list[0].main.aqi
    setAqi(aqiData.list[0].main.aqi)
  } catch (err) {
    console.error(err)
    setAqi(null)
  }
}

  return (
    <div className="bg-[#E4D9FF] flex ">
      <Sidebar />
      <div className="w-[85%]">
        <Header onSearch={fetchWeather} />
        <div className="flex w-full flex-col h-[30%]">
          {weather ? (
            <div className='w-full flex flex-col'>
              <WeatherCard weather={weather} />
              <AirQualityCard aqi={aqi}/>

            </div>
          ) : (
            <div className="bg-white self-center w-[50%] h-[50%] p-6 rounded-xl shadow-md mt-10 text-center">
              <h2 className="text-2xl font-bold mb-2">No city selected</h2>
              <p className="text-gray-600">
                Please search for a city above to see the weather.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
