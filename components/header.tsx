'use client'
import { useState } from 'react'

export default function Header({ onSearch }: { onSearch: (city: string) => void }) {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([])
      return
    }
    try {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=b5be6ad8befee046a1e1e4f4e921f49c`
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

  return  (<div className="flex justify-between items-center p-4 bg-[#E4D9FF] border-b-1 border-[#30343F] text-white relative">
      <h1 className="text-2xl text-[#30343F] font-bold">Weather App</h1>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
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
            className="p-2 rounded border-1 border-[#30343F] text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-[#30343F] px-4 py-2 rounded hover:bg-[#bd2525]"
          >
            Search
          </button>
        </div>
        {suggestions.length > 0 && (
          <ul className="absolute top-16 right-40 bg-white border border-gray-300 rounded-lg shadow-lg w-fit z-10 p-2 text-black">
            {suggestions.map((city) => (
              <li
                key={city.lat + city.lon}
                onClick={() => handleSelectSuggestion(city.name)}
                className="cursor-pointer p-2 hover:bg-gray-200 rounded-md"
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
