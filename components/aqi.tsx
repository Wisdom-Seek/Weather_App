export default function AirQualityCard({ aqi }: { aqi: number | null }) {
  if (aqi === null) return null

  const aqiLevels = {
    1: { text: 'Good', color: 'bg-green-500' },
    2: { text: 'Fair', color: 'bg-yellow-500' },
    3: { text: 'Moderate', color: 'bg-orange-500' },
    4: { text: 'Poor', color: 'bg-red-500' },
    5: { text: 'Very Poor', color: 'bg-purple-700' },
  }

  const level = aqiLevels[aqi as 1 | 2 | 3 | 4 | 5]

  return (
    <div className="bg-white w-[50%] self-center text-gray-800 p-6 rounded-xl shadow-xl mt-6">
      <h2 className="text-2xl font-bold mb-2">Air Quality Index</h2>
      <div className="flex items-center gap-4">
        <div className={`w-4 h-4 rounded-full ${level.color}`} />
        <p className="text-lg font-semibold">{level.text} (AQI: {aqi})</p>
      </div>
    </div>
  )
}