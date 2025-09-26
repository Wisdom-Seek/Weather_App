'use client'
import { useState } from 'react'

export default function Header({ onSearch }: { onSearch: (city: string) => void }) {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([])
      return
    }
    try {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
      )
      const data = await res.json()
      setSuggestions(data)
    } catch (err) {
      console.error('Failed to fetch suggestions:', err)
      setSuggestions([])
    }
  }

  const handleSearch = () => {
    if (input) {
      onSearch(input)
      setSuggestions([])
    }
  }

  const handleSelectSuggestion = (city: string) => {
    setInput(city)
    onSearch(city)
    setSuggestions([])
  }

  return (
    <div className="flex justify-between items-center p-4 bg-[#E4D9FF] border-b-2 border-[#30343F] text-white relative shadow-lg">
      <h1 className="text-2xl text-[#30343F] font-bold">Weather App</h1>
      <div className="flex flex-col gap-2 relative">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search City"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              fetchSuggestions(e.target.value)
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            }}
            className="p-3 rounded-lg border-2 border-transparent focus:outline-none focus:border-[#30343F] transition-colors duration-300 shadow-md text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-[#30343F] px-6 py-3 rounded-lg hover:bg-[#bd2525] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md font-semibold"
          >
            Search
          </button>
        </div>
        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-2 text-black">
            {suggestions.map((city) => (
              <li
                key={city.lat + city.lon}
                onClick={() => handleSelectSuggestion(city.name)}
                className="cursor-pointer p-2 hover:bg-gray-200 rounded-md transition-colors duration-200"
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}