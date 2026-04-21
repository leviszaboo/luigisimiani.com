export default function Loader() {
  return (
    <div className="flex gap-1 items-center ml-2">
      <div className="w-2 h-2 bg-[#ffd700] animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-[#ffd700] animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-[#ffd700] animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  )
}
