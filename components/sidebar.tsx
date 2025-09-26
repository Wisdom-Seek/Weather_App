export default function Sidebar() {
  return (
    <div className="w-[15%] bg-[#30343F] flex flex-col items-center shadow-lg h-screen p-4">
      <h2 className="text-xl h-[5%] text-white border--1 border-white font-bold mb-2">Menu</h2>
      <ul className="flex w-full h-[30%] border-b-1 border-t-1 border-white items-center jus flex-col gap-5">
        <li className="cursor-pointer justify-center items-center mt-7  text-center w-[80%] hover:bg-[#FAFAFF] py-2 text-[#FAFAFF] rounded-2xl hover:text-black">Today</li>
        <li className="cursor-pointer  text-center w-[80%] hover:bg-[#FAFAFF]  text-[#FAFAFF] rounded-2xl py-2 hover:text-black">Hourly</li>
        <li className="cursor-pointer  text-center w-[80%] hover:bg-[#FAFAFF]  text-[#FAFAFF] rounded-2xl py-2 hover:text-black">10 Day</li>
        <li className="cursor-pointer  text-center w-[80%] hover:bg-[#FAFAFF]  text-[#FAFAFF] rounded-2xl py-2 hover:text-black">Monthly</li>
      </ul>
    </div>
  )
}

